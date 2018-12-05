using System;
using System.Collections.Generic;
using System.IO;

namespace part2
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt");
            var unitTypes = new List<string>();
            for (int i = 0; i < 26; i++)
            {
                unitTypes.Add(((char)(65 + i)).ToString() + ((char)(65 + 32 + i)).ToString());
                unitTypes.Add(((char)(65 + 32 + i)).ToString() + ((char)(65 + i)).ToString());
            }

            Console.WriteLine($"Starting with input length {input.Length}");

            var shortestPolymerLength = Int32.MaxValue;
            for (int i = 0; i < 26; i++)
            {
                var workingInput = input
                                    .Replace(((char)(65 + i)).ToString(), "")
                                    .Replace(((char)(65 + 32 + i)).ToString(), "");
                while (true)
                {
                    var inputBeforeReacting = workingInput;
                    foreach (var unitType in unitTypes)
                    {
                        workingInput = workingInput.Replace(unitType, "");
                    }

                    if (inputBeforeReacting == workingInput)
                    {
                        break;
                    }
                }

                if (workingInput.Length < shortestPolymerLength)
                {
                    shortestPolymerLength = workingInput.Length;
                }
            }

            Console.WriteLine($"The answer is {shortestPolymerLength}");
        }
    }
}
