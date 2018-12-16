using System;
using System.Collections.Generic;
using System.Linq;

namespace part1
{
    public class Day16
    {

        public List<TestData> ParseInput(string[] lines)
        {
            var testData = new List<TestData>{
                new TestData()
            };
            var lineType = -1;
            var testDataIndex = 0;

            foreach (var line in lines.Select(x => x.Replace("  ", " ").Trim()))
            {
                lineType++;

                if (lineType == 0 && string.IsNullOrEmpty(line))
                {
                    testData.RemoveAll(x => x.Input == null);
                    break;
                }

                switch (lineType)
                {
                    case 0:
                        testData[testDataIndex].Input = line
                            .Replace("Before: [", "")
                            .Replace("]", "")
                            .Split(",")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 1:
                        testData[testDataIndex].Instructions = line
                            .Split(" ")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 2:
                        testData[testDataIndex].Output = line
                            .Replace("After: [", "")
                            .Replace("]", "")
                            .Split(",")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 3:
                        testData.Add(new TestData());
                        testDataIndex++;
                        lineType = -1;
                        break;
                }
            }

            return testData;
        }

        public Dictionary<int, int> GetPossibleOpCodes(List<TestData> testData)
        {
            var operations = new List<Func<int[], int[], int[]>>
            {
                AddRegister,
                AddImmediate,
                MultiplyRegister,
                MultiplyImmediate,
                BitwiseAndRegister,
                BitwiseAndImmediate,
                BitwiseOrRegister,
                BitwiseOrImmediate,
                SetRegister,
                SetImmediate,
                GreaterThanImmediateRegister,
                GreaterThanRegisterImmediate,
                GreaterThanRegisterRegister,
                EqualImmediateRegister,
                EqualRegisterImmediate,
                EqualRegisterRegister
            };

            var possibleOpCodes = new Dictionary<int, int>();

            for (var testDataIndex = 0; testDataIndex < testData.Count; testDataIndex++)
            {
                possibleOpCodes.Add(testDataIndex, 0);

                var data = testData[testDataIndex];
                foreach (var operation in operations)
                {
                    var actualOutput = operation(data.Input, data.Instructions);

                    if (actualOutput[0] == data.Output[0] &&
                        actualOutput[1] == data.Output[1] &&
                        actualOutput[2] == data.Output[2] &&
                        actualOutput[3] == data.Output[3])
                    {
                        possibleOpCodes[testDataIndex]++;
                    }
                }
            }

            return possibleOpCodes;
        }

        public int[] AddRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] + input[instructions[2]];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] AddImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] + instructions[2];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] MultiplyRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] * input[instructions[2]];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] MultiplyImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] * instructions[2];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] BitwiseAndRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] & input[instructions[2]];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] BitwiseAndImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] & instructions[2];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] BitwiseOrRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] | input[instructions[2]];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] BitwiseOrImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] | instructions[2];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] SetRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] SetImmediate(int[] input, int[] instructions)
        {
            var operationResult = instructions[1];

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] GreaterThanImmediateRegister(int[] input, int[] instructions)
        {
            var operationResult = instructions[1] > input[instructions[2]] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] GreaterThanRegisterImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] > instructions[2] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] GreaterThanRegisterRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] > input[instructions[2]] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] EqualImmediateRegister(int[] input, int[] instructions)
        {
            var operationResult = instructions[1] == input[instructions[2]] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] EqualRegisterImmediate(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] == instructions[2] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        public int[] EqualRegisterRegister(int[] input, int[] instructions)
        {
            var operationResult = input[instructions[1]] == input[instructions[2]] ? 1 : 0;

            return BuildOperationResult(input, instructions[3], operationResult);
        }

        private static int[] BuildOperationResult(IReadOnlyList<int> input, int register, int operationResult)
        {

            return new[]
            {
                register == 0 ? operationResult : input[0],
                register == 1 ? operationResult : input[1],
                register == 2 ? operationResult : input[2],
                register == 3 ? operationResult : input[3]
            };
        }
    }
}