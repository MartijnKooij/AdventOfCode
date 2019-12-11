using System;
using System.IO;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputData = File.ReadAllText("input").Split(',');
            int[] intCodes = Array.ConvertAll(inputData, int.Parse);

            var input = 1;
            var output = 0;

            var pos = 0;
            while (true)
            {
                if (pos == 220)
                {
                    pos += 1;
                    pos -= 1;
                }
                var skips = ProcessOpCode(intCodes, pos, input, ref output);
                Console.WriteLine(pos + ": " + output);

                if (skips == -1)
                {
                    break;
                }
                pos += skips;
            }
        }

        private static int ProcessOpCode(int[] intCodes, int pos, int input, ref int output)
        {
            Operation operation = GetOperation(intCodes[pos].ToString());
            var value1 = 0;
            var value2 = 0;
            output = 0;

            switch (operation.Code)
            {
                case 1:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[pos + 1]] : intCodes[pos + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[pos + 2]] : intCodes[pos + 2];
                    intCodes[intCodes[pos + 3]] = value1 + value2; ;

                    return 4;
                case 2:
                    value1 = operation.Param1Mode == 0 ? intCodes[intCodes[pos + 1]] : intCodes[pos + 1];
                    value2 = operation.Param2Mode == 0 ? intCodes[intCodes[pos + 2]] : intCodes[pos + 2];
                    intCodes[intCodes[pos + 3]] = value1 * value2; ;

                    return 4;
                case 3:
                    intCodes[intCodes[pos + 1]] = input;

                    return 2;
                case 4:
                    output = intCodes[intCodes[pos + 1]];

                    return 2;
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
