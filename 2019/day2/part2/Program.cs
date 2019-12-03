using System;
using System.IO;

namespace day2
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input").Split(',');
            for (int noun = 0; noun < 100; noun++)
            {
                for (int verb = 0; verb < 100; verb++)
                {
                    var output = ProcessInput(input, noun, verb);

                    if (output == 19690720)
                    {
                        Console.WriteLine($"100 * {noun} + {verb} = {100*noun+verb}");
                    }
                }
            }
        }

        private static int ProcessInput(string[] input, int noun, int verb)
        {
            int[] intCodes = Array.ConvertAll(input, int.Parse);

            intCodes[1] = noun;
            intCodes[2] = verb;

            var pos = 0;
            while (true)
            {
                if (!ProcessOpCode(intCodes, pos))
                {
                    break;
                }
                pos += 4;
            }

            return intCodes[0];
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
