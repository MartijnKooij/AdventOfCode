using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Threading.Tasks;

namespace part2
{
    class Program
    {
        static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var initialState = input[0].Split(':')[1].Trim();
            var growFunctionList = new List<Func<char, char, char, char, char, char>>();

            for (int g = 2; g < input.Length; g++)
            {
                var growFunction = input[g];

                growFunctionList.Add(
                    (inputL1, inputL2, inputC, inputR1, inputR2) =>
                    {
                        if (inputL1 == growFunction[0] &&
                            inputL2 == growFunction[1] &&
                            inputC == growFunction[2] &&
                            inputR1 == growFunction[3] &&
                            inputR2 == growFunction[4])
                        {
                            return growFunction[9];
                        }

                        return '.';
                    }
                    );
            }

            var growFunctions = growFunctionList.ToImmutableArray();
            var growFunctionCount = growFunctions.Length;

            var stateOffset = 0;

            if (!initialState.StartsWith("."))
            {
                initialState = "." + initialState;
                stateOffset++;
            }
            if (!initialState.EndsWith("."))
            {
                initialState += ".";
            }

            Console.WriteLine($"State at generation {00}: {initialState}");

            var currentState = initialState;
            var lastPercentage = 0.0;
            const long totalGenerations = 5000000;//50000000000;
            for (long generation = 0; generation < totalGenerations; generation++)
            {
                var localState = currentState;
                char[] localNewState = new char[localState.Length];
                Parallel.For(0, currentState.Length, (stateIndex, state) => 
                {
                    char growResult = GetGrowResult(growFunctions, growFunctionCount, localState, stateIndex);

                    localNewState[stateIndex] = growResult;
                });
                var newState = new string(localNewState);

                if (!newState.StartsWith("."))
                {
                    newState = "." + newState;
                    stateOffset++;
                }
                if (!newState.EndsWith("."))
                {
                    newState += ".";
                }

                currentState = newState;

                var percentage = Math.Round(generation / (double)totalGenerations * 100.0, 3);
                if (percentage > lastPercentage)
                {
                    Console.WriteLine($"{percentage} done ({generation} of {totalGenerations})");
                    lastPercentage = percentage;
                }
            }

            var sumOfPotsWithPlants = CountPotsWithPlants(currentState, stateOffset);

            Console.WriteLine($"The answer is {sumOfPotsWithPlants}");
        }

        private static long CountPotsWithPlants(string state, int stateOffset)
        {
            var sumOfPotsWithPlants = 0;
            for (int stateIndex = 0; stateIndex < state.Length; stateIndex++)
            {
                if (state[stateIndex] == '#')
                {
                    sumOfPotsWithPlants += stateIndex - stateOffset;
                }
            }

            return sumOfPotsWithPlants;
        }

        private static char GetGrowResult(
            ImmutableArray<Func<char, char, char, char, char, char>> growFunctions,
            int growFunctionCount,
            string currentState,
            int stateIndex
            )
        {
            var growResult = '.';

            var l1 = '.';
            if (stateIndex >= 2)
            {
                l1 = currentState[stateIndex - 2];
            }
            var l2 = '.';
            if (stateIndex >= 1)
            {
                l2 = currentState[stateIndex - 1];
            }

            var c = currentState[stateIndex];

            var r1 = '.';
            if (stateIndex <= currentState.Length - 2)
            {
                r1 = currentState[stateIndex + 1];
            }
            var r2 = '.';
            if (stateIndex <= currentState.Length - 3)
            {
                r2 = currentState[stateIndex + 2];
            }

            for (var gf = 0; gf < growFunctionCount; gf++)
            {
                growResult = growFunctions[gf](l1, l2, c, r1, r2);

                if (growResult == '#')
                {
                    break;
                }
            }

            return growResult;
        }
    }
}
