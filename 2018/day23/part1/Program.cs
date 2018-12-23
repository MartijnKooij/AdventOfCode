using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            var bots = new List<(long x, long y, long z, long r)>();
            foreach (var line in input)
            {
                var bot = new string(Array.FindAll<char>(line.ToCharArray(), (
                    c => (char.IsNumber(c) || c == ',' || c == '-')))).Split(",");

                bots.Add((long.Parse(bot[0]), long.Parse(bot[1]), long.Parse(bot[2]), long.Parse(bot[3])));
            }

            var botWithHighestRange = bots.OrderByDescending(b => b.r).First();
            var botsInRange = bots.Where(b => Distance(botWithHighestRange, b) <= botWithHighestRange.r);
            
            Console.WriteLine($"{botsInRange.Count()} of {bots.Count()} nano bots are in range of bot {botWithHighestRange}");
        }

        private static long Distance((long x, long y, long z, long r) source, (long x, long y, long z, long r) destination)
        {
            return Math.Abs(destination.x - source.x) + Math.Abs(destination.y - source.y) + Math.Abs(destination.z - source.z);
        }

    }
}
