using System;
using System.IO;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input").Split(',');
            int[] intCodes = Array.ConvertAll(input, int.Parse);

            intCodes[1] = 12;
            intCodes[2] = 2;

            var pos = 0;
            while (true)
            {
                if (!ProcessOpCode(intCodes, pos))
                {
                    break;
                }
                pos += 4;
            }

            Console.WriteLine(string.Join(",", intCodes));
        }

        private static bool ProcessOpCode(int[] intCodes, int pos)
        {
            var opCode = intCodes[pos];
            var value = 0;

            switch (opCode)
            {
                case 1:
                    value = intCodes[intCodes[pos + 1]] + intCodes[intCodes[pos + 2]];
                    intCodes[intCodes[pos + 3]] = value;

                    return true;
                case 2:
                    value = intCodes[intCodes[pos + 1]] * intCodes[intCodes[pos + 2]];
                    intCodes[intCodes[pos + 3]] = value;

                    return true;
                case 99:

                    return false;
                default:
                    return true;
            }
        }
    }
}
