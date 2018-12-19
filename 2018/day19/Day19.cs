using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    public class Day19
    {

        public List<TestData> ParseTestData(IEnumerable<string> lines)
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

        public List<int[]> ParseTestInput(IEnumerable<string> lines)
        {
            return (from line in lines.Skip(3298)
                    where !string.IsNullOrEmpty(line)
                    select line.Split(" ")
                        .Select(x => int.Parse(x.Trim()))
                        .ToArray()).ToList();
        }

        public (List<int[]> registers, int instructionPointer) ParseDay19TestInput(IList<string> lines)
        {
            List<int[]> registers = new List<int[]>();
            var instructionPointer = int.Parse(lines[0].Substring(4));

            for (int i = 1; i < lines.Count; i++)
            {
                var instructions = lines[i].Split(' ');
                var opCodeIndex = opCodeNames[instructions[0]].ToString() + " ";
                instructions[0] = opCodeIndex;

                registers.Add(instructions.Select(x => int.Parse(x.Trim())).ToArray());
            }

            return (registers, instructionPointer);
        }

        public Dictionary<int, int> GetPossibleOpCodes(List<TestData> testData)
        {
            var possibleOpCodes = new Dictionary<int, int>();

            for (var testDataIndex = 0; testDataIndex < testData.Count; testDataIndex++)
            {
                possibleOpCodes.Add(testDataIndex, 0);

                var data = testData[testDataIndex];
                foreach (var operation in Operations)
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

        public List<OpCode> GetLikelyOpCodes(List<TestData> testData)
        {
            var likelyOpCodes = new List<OpCode>();

            foreach (var data in testData)
            {
                for (var operationIndex = 0; operationIndex < Operations.Count; operationIndex++)
                {
                    var operation = Operations[operationIndex];
                    var actualOutput = operation(data.Input, data.Instructions);

                    if (actualOutput[0] == data.Output[0] &&
                        actualOutput[1] == data.Output[1] &&
                        actualOutput[2] == data.Output[2] &&
                        actualOutput[3] == data.Output[3])
                    {
                        likelyOpCodes.Add(new OpCode
                        {
                            OperationIndex = operationIndex,
                            OperationCode = data.Instructions[0]
                        });
                    }
                }
            }

            var groupedOpCodes =
                from likelyOpCode in likelyOpCodes
                group likelyOpCode by new
                {
                    likelyOpCode.OperationCode,
                    likelyOpCode.OperationIndex
                }
                into groupedLikelyOpCodes
                select new OpCode
                {
                    OperationCode = groupedLikelyOpCodes.Key.OperationCode,
                    OperationIndex = groupedLikelyOpCodes.Key.OperationIndex,
                    Occurences = groupedLikelyOpCodes.Count()
                };

            File.WriteAllLines("output.txt", groupedOpCodes
            .OrderBy(x => x.OperationCode)
            .ThenBy(x => x.OperationIndex)
            .Select(x => x.OperationCode + ": " + x.OperationIndex + " = " + x.Occurences));
            return groupedOpCodes.ToList();
        }

        public int[] ExecuteProgram(IEnumerable<int[]> testInput)
        {
            var currentRegister = new[] { 0, 0, 0, 0 };
            foreach (var register in testInput)
            {
                var operation = Operations[opCodeIndices[register[0]]];
                currentRegister = operation(currentRegister, register);
            }

            return currentRegister;
        }

        public int[] ExecuteDay19Program(List<int[]> registers, int instructionPointer)
        {
            var currentRegister = new[] { 0, 0, 0, 0, 0 };
            var currentInsructionPointer = instructionPointer;
            while (currentInsructionPointer >= 0 && currentInsructionPointer < registers.Count) {
                var register = registers[currentInsructionPointer];

                register[0] = currentInsructionPointer;

                var operation = Operations[opCodeIndices[register[1]]];
                currentRegister = operation(currentRegister, register);

                currentInsructionPointer = register[0];
                currentInsructionPointer++;
            }

            return currentRegister;
        }


        private readonly Dictionary<string, int> opCodeNames = new Dictionary<string, int> {
             {"borr", 6}, {"addr", 0}, {"eqrr", 15}, {"addi", 1}, {"eqri", 14}, {"eqir", 13},
             {"gtri", 11}, {"mulr", 2}, {"setr", 8}, {"gtir", 10}, {"muli", 3}, {"banr", 4},
             {"seti", 9}, {"gtrr", 12}, {"bani", 5}, {"bori", 7} };


        private readonly int[] opCodeIndices = { 6, 0, 15, 1, 14, 13, 11, 2, 8, 10, 3, 4, 9, 12, 5, 7 };

        private List<Func<int[], int[], int[]>> Operations
        {
            get
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
                return operations;
            }
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
                register == 3 ? operationResult : input[3],
                register == 4 ? operationResult : input[4],
                register == 5 ? operationResult : input[5]
            };
        }
    }
}