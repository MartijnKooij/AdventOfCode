using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;

namespace part2
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

            for (var x = 0; x <= target.x + 50; x++)
            {
                for (var y = 0; y <= target.y + 50; y++)
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
            FindRoute(regions, target);
        }

        private static void FindRoute(IReadOnlyCollection<Region> regions, (int x, int y) target)
        {
            (int x, int y)[] directionOffsets = { (-1, 0), (0, 1), (1, 0), (0, -1) };
            var visitQueue = new Queue<(int x, int y, Tool tool, int switchCost, int minutes)>();
            var visitedLocationsWithTool = new HashSet<(int x, int y, Tool tool)>();

            visitQueue.Enqueue((0, 0, Tool.Torch, 0, 0));
            visitedLocationsWithTool.Add((0, 0, Tool.Torch));

            while (visitQueue.Count > 0)
            {
                var (x, y, tool, switchCost, minutes) = visitQueue.Dequeue();

                if (switchCost > 0)
                {
                    if (switchCost != 1 || visitedLocationsWithTool.Add((x, y, tool)))
                    {
                        visitQueue.Enqueue((x, y, tool, switchCost - 1, minutes + 1));
                    }

                    continue;
                }

                if (IsAtTargetWithTorch(x, y, target, tool))
                {
                    Console.WriteLine(minutes);
                    break;
                }

                foreach (var (offsetX, offsetY) in directionOffsets)
                {
                    var (targetX, targetY) = (x + offsetX, y + offsetY);

                    if (IsOutOfBounds(targetX, targetY, target))
                    {
                        continue;
                    }

                    var targetRegion = FindRegionByLocation(regions, targetX, targetY);

                    if (ToolsPerGeoType[targetRegion.GeoType].Contains(tool) && visitedLocationsWithTool.Add((targetX, targetY, tool)))
                    {
                        visitQueue.Enqueue((targetX, targetY, tool, 0, minutes + 1));
                    }
                }

                var currentRegion = FindRegionByLocation(regions, x, y);
                foreach (var otherTool in ToolsPerGeoType[currentRegion.GeoType])
                {
                    visitQueue.Enqueue((x, y, otherTool, 6, minutes + 1));
                }
            }
        }

        private static bool IsAtTargetWithTorch(int x, int y, (int x, int y) target, Tool tool)
        {
            return (x, y) == target && tool == Tool.Torch;
        }

        private static Region FindRegionByLocation(IReadOnlyCollection<Region> regions, int targetX, int targetY)
        {
            var targetRegion = regions.Single(r => r.Location.x == targetX && r.Location.y == targetY);
            return targetRegion;
        }

        private static bool IsOutOfBounds(int targetX, int targetY, (int x, int y) target)
        {
            return targetX < 0 || targetY < 0 || targetX > target.x + 50 || targetY > target.y + 50;
        }

        private static void ComputeRisk(IEnumerable<Region> regions)
        {
            var risk = regions.Where(r => r.GeoType != GeoType.Me && r.GeoType != GeoType.Target)
                .Sum(region => (int)region.GeoType);
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

        private static void LogMap(IEnumerable<Region> regions, (int x, int y) target)
        {
            File.WriteAllText("output.txt", "");
            var map = new string[target.x + 1 + 50, target.y + 1 + 50];
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

        private static readonly Dictionary<GeoType, Tool[]> ToolsPerGeoType = new Dictionary<GeoType, Tool[]>
        {
            {GeoType.Me, new[] {Tool.Torch}},
            {GeoType.Target, new[] {Tool.Torch}},
            {GeoType.Rock, new[] {Tool.Torch, Tool.ClimbingGear}},
            {GeoType.Wet, new[] {Tool.Neither, Tool.ClimbingGear}},
            {GeoType.Narrow, new[] {Tool.Torch, Tool.Neither}}
        };

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

    enum Tool
    {
        Torch,
        ClimbingGear,
        Neither
    }
}
