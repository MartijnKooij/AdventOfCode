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
            List<(long x, long y, long z, long r)> bots = ParseInput(input);

            var minX = bots.Min(b => b.x);
            var maxX = bots.Max(b => b.x);
            var minY = bots.Min(b => b.y);
            var maxY = bots.Max(b => b.y);
            var minZ = bots.Min(b => b.z);
            var maxZ = bots.Max(b => b.z);

            Console.WriteLine($"x({minX},{maxX}) y({minY},{maxY}) z({minZ},{maxZ})");

            var mostInRange = 0;
            var bestLocations = new List<(long x, long y, long z, long r)>();
            for (var x = minX; x < maxX; x++)
            {
                for (var y = minY; y < maxY; y++)
                {
                    for (var z = minZ; z < maxZ; z++)
                    {
                        var location = (x, y, z, 0);
                        var botsInRange = bots.Where(b => Distance(location, b) <= b.r);
                        var inRange = botsInRange.Count();

                        if (inRange > mostInRange)
                        {
                            bestLocations.Clear();
                        }
                        if (inRange >= mostInRange)
                        {
                            mostInRange = inRange;
                            bestLocations.Add(location);
                        }
                    }
                }
            }

            Console.WriteLine($"{mostInRange} > {bestLocations.Count()}");
            var shortestDistance = long.MaxValue;
            foreach (var location in bestLocations)
            {
                var distance = Distance((0, 0, 0, 0), location);
                if (distance < shortestDistance)
                {
                    shortestDistance = distance;
                }
            }
            Console.WriteLine($"The shortest distance is {shortestDistance}");
        }

        private static List<(long x, long y, long z, long r)> ParseInput(string[] input)
        {
            var bots = new List<(long x, long y, long z, long r)>();
            foreach (var line in input)
            {
                var bot = new string(Array.FindAll<char>(line.ToCharArray(), (
                    c => (char.IsNumber(c) || c == ',' || c == '-')))).Split(",");

                bots.Add((long.Parse(bot[0]), long.Parse(bot[1]), long.Parse(bot[2]), long.Parse(bot[3])));
            }

            return bots;
        }

        private static long Distance((long x, long y, long z, long r) source, (long x, long y, long z, long r) destination)
        {
            return Math.Abs(destination.x - source.x) + Math.Abs(destination.y - source.y) + Math.Abs(destination.z - source.z);
        }

    }
}
