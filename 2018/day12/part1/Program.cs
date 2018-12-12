using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var initialState = input[0].Split(':')[1].Trim();
            var states = new List<string>();
            var growFunctions = new List<GrowFunction>();

            for (int g = 2; g < input.Length; g++)
            {
                growFunctions.Add(new GrowFunction(input[g]));
            }

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

            states.Add(initialState);
            Console.WriteLine($"State at generation {00}: {initialState}");
            for (int generation = 0; generation < 20; generation++)
            {
                var currentState = states[generation];
                var newState = "";

                for (int stateIndex = 0; stateIndex < currentState.Length; stateIndex++)
                {
                    char growResult = GetGrowResult(growFunctions, currentState, stateIndex);

                    newState += growResult;
                }

                if (!newState.StartsWith("."))
                {
                    newState = "." + newState;
                    stateOffset++;
                }
                if (!newState.EndsWith("."))
                {
                    newState += ".";
                }
                states.Add(newState);
                Console.WriteLine($"State at generation {(generation + 1 < 10 ? "0" : "")}{generation + 1}: {newState}");
            }

            int sumOfPotsWithPlants = CountPotsWithPlants(states[20], stateOffset);

            Console.WriteLine($"The answer is {sumOfPotsWithPlants}");
        }

        private static int CountPotsWithPlants(string state, int stateOffset)
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

        private static char GetGrowResult(List<GrowFunction> growFunctions, string currentState, int stateIndex)
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

            foreach (var growFunction in growFunctions)
            {
                growResult = growFunction.GetState(l1, l2, c, r1, r2);

                if (growResult == '#')
                {
                    break;
                }
            }

            return growResult;
        }
    }

    class GrowFunction
    {
        public Func<char, char, char, char, char, char> GetState { get; }

        public GrowFunction(string growFunction)
        {
            GetState = (inputL1, inputL2, inputC, inputR1, inputR2) =>
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
            };
        }

    }
}
