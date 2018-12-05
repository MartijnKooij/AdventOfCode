using System;
using System.Collections.Generic;
using System.IO;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt");
            var unitTypes = new List<string>();
            for (int i = 0; i < 26; i++)
            {
                unitTypes.Add(((char) (65 + i)).ToString() + ((char) (65 + 32 + i)).ToString());
                unitTypes.Add(((char) (65 + 32 + i)).ToString() + ((char) (65 + i)).ToString());
            }

            Console.WriteLine($"Starting with input length {input.Length}");

            while (true)
            {
                var inputBeforeReacting = input;
                foreach (var unitType in unitTypes)
                {
                    input = input.Replace(unitType, "");
                }

                if (inputBeforeReacting == input) {
                    break;
                }
            }

            Console.WriteLine($"The answer is {input} with length {input.Length}");
        }
    }
}
