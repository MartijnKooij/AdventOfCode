using System;

namespace day2
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputData = "3,225,1,225,6,6,1100,1,238,225,104,0,101,71,150,224,101,-123,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,2,205,209,224,1001,224,-3403,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1101,55,24,224,1001,224,-79,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1,153,218,224,1001,224,-109,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1002,201,72,224,1001,224,-2088,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,70,29,225,102,5,214,224,101,-250,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1101,12,52,225,1101,60,71,225,1001,123,41,224,1001,224,-111,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,78,66,224,1001,224,-5148,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,1101,29,77,225,1102,41,67,225,1102,83,32,225,1101,93,50,225,1102,53,49,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,677,677,224,1002,223,2,223,1005,224,329,101,1,223,223,7,677,677,224,1002,223,2,223,1005,224,344,1001,223,1,223,7,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,374,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,404,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,419,101,1,223,223,1007,677,677,224,1002,223,2,223,1005,224,434,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,449,1001,223,1,223,1008,226,677,224,1002,223,2,223,1006,224,464,101,1,223,223,8,677,677,224,1002,223,2,223,1006,224,479,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,494,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,107,226,226,224,1002,223,2,223,1006,224,524,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,539,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,108,677,677,224,102,2,223,223,1005,224,569,101,1,223,223,107,677,226,224,102,2,223,223,1005,224,584,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,599,101,1,223,223,1108,677,226,224,1002,223,2,223,1006,224,614,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,629,1001,223,1,223,1008,677,677,224,102,2,223,223,1006,224,644,101,1,223,223,1007,226,677,224,102,2,223,223,1005,224,659,101,1,223,223,108,226,677,224,102,2,223,223,1006,224,674,101,1,223,223,4,223,99,226".Split(',');
            int[] intCodes = Array.ConvertAll(inputData, int.Parse);

            var input = 5;
            var output = 0;

            var instructionPointer = 0;
            while (true)
            {
                instructionPointer = ProcessOpCode(intCodes, instructionPointer, input, ref output);
                Console.WriteLine(instructionPointer + ": " + output);

                if (instructionPointer == -1)
                {
                    break;
                }
            }
        }

        private static int ProcessOpCode(int[] intCodes, int instructionPointer, int input, ref int output)
        {
            Operation operation = GetOperation(intCodes[instructionPointer].ToString());
            var value1 = 0;
            var value2 = 0;
            output = 0;

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
                    intCodes[intCodes[instructionPointer + 1]] = input;

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
                    } else
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
                    } else
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
                    } else
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
                    } else
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
