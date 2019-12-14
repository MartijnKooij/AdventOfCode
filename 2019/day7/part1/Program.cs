using System;
using System.Collections.Generic;
using System.Linq;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputData = "3,8,1001,8,10,8,105,1,0,0,21,34,43,60,81,94,175,256,337,418,99999,3,9,101,2,9,9,102,4,9,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,102,4,9,9,1001,9,4,9,102,3,9,9,4,9,99,3,9,102,4,9,9,1001,9,2,9,1002,9,3,9,101,4,9,9,4,9,99,3,9,1001,9,4,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,99".Split(',');
            //var inputData = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0".Split(",");
            var inputCombinations = GetAllInputCombinations();
            int[] inputs = new int[2] { 0, 0 };
            Dictionary<string, int> outputs = new Dictionary<string, int>();

            foreach (var combo in inputCombinations)
            {
                int[] intCodes = Array.ConvertAll(inputData, int.Parse);
                var output = 0;
                for (int i = 0; i < 5; i++)
                {
                    inputs[0] = combo[i];
                    var inputIndex = 0;

                    var instructionPointer = 0;
                    while (true)
                    {
                        instructionPointer = ProcessOpCode(intCodes, instructionPointer, inputs, ref inputIndex, ref output);
                        inputs[1] = output;

                        if (instructionPointer == -1)
                        {
                            break;
                        }
                    }
                }
                outputs.Add(string.Join(",", combo), output);
                Console.WriteLine(string.Join(",", combo) + ": " + output);
            }
            KeyValuePair<string, int> highestOutput = outputs.OrderByDescending((x) => x.Value).First();
            Console.WriteLine($"Highest output: {highestOutput.Key}: {highestOutput.Value}");
        }

        private static int ProcessOpCode(int[] intCodes, int instructionPointer, int[] inputs, ref int inputIndex, ref int output)
        {
            Operation operation = GetOperation(intCodes[instructionPointer].ToString());
            var value1 = 0;
            var value2 = 0;

            switch (operation.Code)
            {
                case 1:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];
                    intCodes[intCodes[instructionPointer + 3]] = value1 + value2; ;

                    instructionPointer += 4;

                    return instructionPointer;
                case 2:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];
                    intCodes[intCodes[instructionPointer + 3]] = value1 * value2; ;

                    instructionPointer += 4;

                    return instructionPointer;
                case 3:
                    intCodes[intCodes[instructionPointer + 1]] = inputs[inputIndex];
                    inputIndex += 1;

                    instructionPointer += 2;

                    return instructionPointer;
                case 4:
                    output = intCodes[intCodes[instructionPointer + 1]];

                    instructionPointer += 2;

                    return instructionPointer;
                case 5:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];

                    if (value1 != 0)
                    {
                        instructionPointer = value2;
                    }
                    else
                    {
                        instructionPointer += 3;
                    }

                    return instructionPointer;
                case 6:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];

                    if (value1 == 0)
                    {
                        instructionPointer = value2;
                    }
                    else
                    {
                        instructionPointer += 3;
                    }

                    return instructionPointer;
                case 7:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];

                    if (value1 < value2)
                    {
                        intCodes[intCodes[instructionPointer + 3]] = 1;
                    }
                    else
                    {
                        intCodes[intCodes[instructionPointer + 3]] = 0;
                    }

                    instructionPointer += 4;

                    return instructionPointer;
                case 8:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[instructionPointer + 1]] : intCodes[instructionPointer + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[instructionPointer + 2]] : intCodes[instructionPointer + 2];

                    if (value1 == value2)
                    {
                        intCodes[intCodes[instructionPointer + 3]] = 1;
                    }
                    else
                    {
                        intCodes[intCodes[instructionPointer + 3]] = 0;
                    }

                    instructionPointer += 4;

                    return instructionPointer;
                case 99:

                    return -1;
                default:
                    throw new InvalidOperationException($"Unknown operation {operation.ToString()}");
            }
        }

        private static Operation GetOperation(string operation)
        {
            var opCode = 0;
            var param1Mode = 0;
            var param2Mode = 0;
            if (operation.Length == 4)
            {
                opCode = int.Parse(operation.Substring(2));
                param1Mode = int.Parse(operation.Substring(1, 1));
                param2Mode = int.Parse(operation.Substring(0, 1));
            }
            else if (operation.Length == 3)
            {
                opCode = int.Parse(operation.Substring(1));
                param1Mode = int.Parse(operation.Substring(0, 1));
            }
            else
            {
                opCode = int.Parse(operation);
            }

            return new Operation
            {
                Code = opCode,
                Param1Mode = param1Mode,
                Param2Mode = param2Mode
            };
        }

        private static List<int[]> GetAllInputCombinations()
        {
            var inputCombinations = new List<int[]>();
            int[] combo;
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    for (int k = 0; k < 5; k++)
                    {
                        for (int l = 0; l < 5; l++)
                        {
                            for (int m = 0; m < 5; m++)
                            {
                                combo = new int[] { i, j, k, l, m };
                                if (combo.Distinct().Count() != 5)
                                {
                                    continue;
                                }
                                if (!inputCombinations.Contains(combo))
                                {
                                    inputCombinations.Add(combo);
                                }
                            }
                        }
                    }
                }
            }

            return inputCombinations;
        }

        private class Operation
        {
            public int Code { get; set; }
            public int Param1Mode { get; set; }
            public int Param2Mode { get; set; }

            public override string ToString()
            {
                return $"Code: {Code}, 1: {Param1Mode}, 2: {Param2Mode}";
            }
        }
    }
}
