using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    public static class Program
    {
        public static void Main()
        {
            const int depth = 3879;
            (int x, int y) target = (8, 713);
            var regions = new List<Region>
            {
                new Region {Location = (0, 0), GeoIndex = 0, GeoType = GeoType.Me},
                new Region {Location = target, GeoIndex = 0, GeoType = GeoType.Target}
            };

            for (var x = 0; x <= target.x; x++)
            {
                for (var y = 0; y <= target.y; y++)
                {
                    if (regions.Any(r => r.Location.x == x && r.Location.y == y))
                    {
                        continue;
                    }

                    var geoIndex = GetGeoIndex(regions, x, y);
                    var erosionLevel = (geoIndex + depth) % 20183;
                    var region = new Region
                    {
                        Location = (x, y),
                        GeoIndex = geoIndex,
                        ErosionLevel = erosionLevel,
                        GeoType = (GeoType)(erosionLevel % 3)
                    };

                    regions.Add(region);
                }
            }

            LogMap(regions, target);
            ComputeRisk(regions);
        }

        private static void ComputeRisk(List<Region> regions)
        {
            var risk = 0;
            foreach (var region in regions.Where(r => r.GeoType != GeoType.Me && r.GeoType != GeoType.Target))
            {
                risk += (int)region.GeoType;
            }
            Console.WriteLine($"The total risk is {risk}");
        }

        private static int GetGeoIndex(IReadOnlyCollection<Region> regions, int x, int y)
        {
            if (y == 0) return 16807 * x;
            if (x == 0) return 48271 * y;

            return GetNeighboringErosionLevel(regions, x, y);
        }

        private static int GetNeighboringErosionLevel(IReadOnlyCollection<Region> regions, int x, int y)
        {
            var neighbor1 = regions.Single(r => r.Location.x == x - 1 && r.Location.y == y);
            var neighbor2 = regions.Single(r => r.Location.x == x && r.Location.y == y - 1);

            return neighbor1.ErosionLevel * neighbor2.ErosionLevel;
        }

        private static void LogMap(List<Region> regions, (int x, int y) target)
        {
            File.WriteAllText("output.txt", "");
            var map = new string[target.x + 1, target.y + 1];
            foreach (var region in regions)
            {
                map[region.Location.x, region.Location.y] = region.GeoType.GetDescription();
            }
            using (var file = new StreamWriter("output.txt", true, Encoding.ASCII))
            {
                for (var y = 0; y < map.GetLength(1); y++)
                {
                    var line = new StringBuilder(map.GetLength(0));
                    for (var x = 0; x < map.GetLength(0); x++)
                    {
                        line.Append(map[x, y]);
                    }
                    file.WriteLine(line);
                }
            }
        }

    }

    class Region
    {
        public GeoType GeoType { get; set; }

        public (int x, int y) Location { get; set; }

        public int ErosionLevel { get; set; }

        public int GeoIndex { get; set; }
    }

    enum GeoType
    {
        [Description(".")]
        Rock = 0,

        [Description("=")]
        Wet = 1,

        [Description("|")]
        Narrow = 2,

        [Description("M")]
        Me = 3,

        [Description("T")]
        Target = 4
    }
}
