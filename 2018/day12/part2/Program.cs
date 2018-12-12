using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace part2
{
    public static class Program
    {
        public static void Main()
        {
            var input = File.ReadAllLines("input.txt");

            var initialStateValue = input[0].Split(':')[1].Trim();
            var initialStateList = new List<bool>();
            foreach (var stateValue in initialStateValue)
            {
                initialStateList.Add(stateValue == '#');
            }
            var initialState = initialStateList.ToArray();

            var growFunctions = ParseGrowFunctions(input);

            var stateOffset = 0;

            initialState = PadState(initialState, ref stateOffset);

            Console.WriteLine($"State at generation {00}: {initialState}");

            var currentState = initialState;

            var lastPercentage = 0.0;
            const long totalGenerations = 50000000000;//50000000000;
            for (long generation = 0; generation < totalGenerations; generation++)
            {
                var newState = ComputeState(currentState, growFunctions);

                newState = PadState(newState, ref stateOffset);

                currentState = newState;

                ConsoleLogProgress(generation, totalGenerations, ref lastPercentage);
            }

            var sumOfPotsWithPlants = CountPotsWithPlants(currentState, stateOffset);

            Console.WriteLine($"The answer is {sumOfPotsWithPlants}");

            Console.ReadLine();
        }

        private static ImmutableArray<GrowFunction> ParseGrowFunctions(IReadOnlyList<string> input)
        {
            var growFunctionList = new List<GrowFunction>();

            for (int g = 2; g < input.Count; g++)
            {
                growFunctionList.Add(
                    new GrowFunction(input[g][0], input[g][1], input[g][2], input[g][3], input[g][4], input[g][9])
                );
            }

            var growFunctions = growFunctionList.ToImmutableArray();
            return growFunctions;
        }

        private static bool[] ComputeState(IReadOnlyList<bool> currentState, ImmutableArray<GrowFunction> growFunctions)
        {
            bool[] localState = new bool[currentState.Count];

            Parallel.For(0, currentState.Count, (stateIndex, state) =>
            {
                bool growResult = GetGrowResult(growFunctions, currentState, stateIndex);

                localState[stateIndex] = growResult;
            });

            return localState;
        }

        private static long CountPotsWithPlants(IReadOnlyList<bool> state, int stateOffset)
        {
            var sumOfPotsWithPlants = 0;
            for (int stateIndex = 0; stateIndex < state.Count; stateIndex++)
            {
                if (state[stateIndex])
                {
                    sumOfPotsWithPlants += stateIndex - stateOffset;
                }
            }

            return sumOfPotsWithPlants;
        }

        private static bool GetGrowResult(
            ImmutableArray<GrowFunction> growFunctions,
            IReadOnlyList<bool> currentState,
            int stateIndex
            )
        {
            var check = new bool[5];
            if (stateIndex >= 2)
            {
                check[0] = currentState[stateIndex - 2];
            }
            if (stateIndex >= 1)
            {
                check[1] = currentState[stateIndex - 1];
            }

            check[2] = currentState[stateIndex];

            if (stateIndex <= currentState.Count - 2)
            {
                check[3] = currentState[stateIndex + 1];
            }
            if (stateIndex <= currentState.Count - 3)
            {
                check[4] = currentState[stateIndex + 2];
            }

            return growFunctions.Any(growFunction => growFunction.Check(check));
        }

        private static bool[] PadState(bool[] state, ref int stateOffset)
        {
            if (state[0])
            {
                var tempState = state.ToList();
                tempState.Insert(0, false);
                state = tempState.ToArray();
                stateOffset++;
            }

            if (state[state.Length-1])
            {
                var tempState = state.ToList();
                tempState.Add(false);
                state = tempState.ToArray();
            }

            return state;
        }

        private static void ConsoleLogProgress(long generation, long totalGenerations, ref double lastPercentage)
        {
            var percentage = Math.Round(generation / (double)totalGenerations * 100.0, 2);
            if (!(percentage > lastPercentage))
            {
                return;
            }

            Console.WriteLine($"{percentage} done ({generation} of {totalGenerations})");
            lastPercentage = percentage;
        }
    }

    public class GrowFunction
    {
        private readonly bool[] input;

        private readonly bool successResult;

        public bool Check(bool[] check)
        {
            for (int i = 0; i < 5; i++)
            {
                if (check[i] != input[i])
                {
                    return false;
                }
            }

            return successResult;
        }

        public GrowFunction(char inputL1, char inputL2, char inputC, char inputR1, char inputR2, char successResult)
        {
            input = new[] {inputL1 == '#', inputL2 == '#', inputC == '#', inputR1 == '#', inputR2 == '#' };

            this.successResult = successResult == '#';
        }
    }
}
