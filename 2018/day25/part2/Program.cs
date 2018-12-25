using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    public static class Program
    {
        public static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var stars = ParseInput(input);
            var constellations = new Dictionary<int, HashSet<(int x, int y, int z, int t)>>();

            var constellationKey = 0;
            for (var s1 = 0; s1 < stars.Count; s1++)
            {
                var star1 = stars[s1];
                for (var s2 = s1 + 1; s2 < stars.Count; s2++)
                {
                    var star2 = stars[s2];

                    if (Distance(star1, star2) > 3) continue;

                    if (constellations.Any(c => c.Value.Contains(star1) && c.Value.Contains(star2)))
                    {
                        continue;
                    }

                    if (constellations.Any(c => c.Value.Contains(star1)) && constellations.Any(c => c.Value.Contains(star2)))
                    {
                        //Both constellations exist somewhere, so merge them.
                        var constellation1 = constellations.Single(c => c.Value.Contains(star1));
                        var (key, constellation2) = constellations.Single(c => c.Value.Contains(star2));
                        foreach (var star in constellation2)
                        {
                            constellation1.Value.Add(star);
                        }

                        constellations.Remove(key);
                    }

                    if (constellations.Any(c => c.Value.Contains(star1)))
                    {
                        var constellation = constellations.Single(c => c.Value.Contains(star1));
                        constellation.Value.Add(star2);
                    }
                    else if (constellations.Any(c => c.Value.Contains(star2)))
                    {
                        var constellation = constellations.Single(c => c.Value.Contains(star2));
                        constellation.Value.Add(star1);
                    }
                    else
                    {
                        constellationKey++;
                        constellations.Add(constellationKey,
                            new HashSet<(int x, int y, int z, int t)> { star1, star2 });
                    }

                }
            }

            var starsInConstellations = constellations.Sum(c => c.Value.Count);
            var starsNotInConstellations = stars.Count - starsInConstellations;
            var totalNumberOfConstellations = starsNotInConstellations + constellations.Count;
            Console.WriteLine($"There are {totalNumberOfConstellations} constellations.");
        }

        private static List<(int x, int y, int z, int t)> ParseInput(IEnumerable<string> input)
        {
            return input.Select(line => line.Split(',').Select(int.Parse).ToList())
                .Select(values => (values[0], values[1], values[2], values[3])).ToList();
        }

        private static int Distance((int x, int y, int z, int t) source, (int x, int y, int z, int t) destination)
        {
            return Math.Abs(destination.x - source.x) + Math.Abs(destination.y - source.y) + Math.Abs(destination.z - source.z) + Math.Abs(destination.t - source.t);
        }

    }
}
