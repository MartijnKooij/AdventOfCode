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
                    testData.RemoveAt(testDataIndex - 1);
                    break;
                }

                switch (lineType)
                {
                    case 0:
                        testData[testDataIndex].Inputs = line
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
                        testData[testDataIndex].Outputs = line
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

        private static IEnumerable<int> BuildOperationResult(IReadOnlyList<int> input, int operationResult)
        {
            return new[] { input[0], input[1], input[2], operationResult };
        }

        public IEnumerable<int> AddRegister(int[] input)
        {
            var operationResult = input[input[1]] + input[input[2]];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> AddImmediate(int[] input)
        {
            var operationResult = input[input[1]] + input[2];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> MultiplyRegister(int[] input)
        {
            var operationResult = input[input[1]] * input[input[2]];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> MultiplyImmediate(int[] input)
        {
            var operationResult = input[input[1]] * input[2];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> BitwiseAndRegister(int[] input)
        {
            var operationResult = input[input[1]] & input[input[2]];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> BitwiseAndImmediate(int[] input)
        {
            var operationResult = input[input[1]] & input[2];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> BitwiseOrRegister(int[] input)
        {
            var operationResult = input[input[1]] | input[input[2]];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> BitwiseOrImmediate(int[] input)
        {
            var operationResult = input[input[1]] | input[2];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> SetRegister(int[] input)
        {
            var operationResult = input[input[1]];

            return BuildOperationResult(input, operationResult);
        }

        public IEnumerable<int> SetImmediate(int[] input)
        {
            var operationResult = input[1];

            return BuildOperationResult(input, operationResult);
        }
    }
}