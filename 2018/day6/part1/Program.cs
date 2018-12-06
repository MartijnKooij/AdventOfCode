using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var points = new List<Point>();
            for (var i = 0; i < input.Length; i++)
            {
                var values = input[i];
                points.Add(new Point(i + 1, values));
            }

            var area = DetermineArea(points);

            for (var x = 0; x < area.GetLength(0); x++)
            {
                for (var y = 0; y < area.GetLength(1); y++)
                {
                    var source = new Point(0, $"{x},{y}");
                    var shortestDistance = int.MaxValue;
                    var shortestPointId = -1;
                    foreach (var destination in points)
                    {
                        if (source.X == destination.X && source.Y == destination.Y)
                        {
                            shortestPointId = destination.Id;
                            break;
                        }

                        var distance = Distance(source, destination);
                        if (distance < shortestDistance)
                        {
                            shortestDistance = distance;
                            shortestPointId = destination.Id;
                        }
                        else if (distance == shortestDistance)
                        {
                            shortestPointId = 0;
                        }

                    }

                    area[x, y] = shortestPointId;
                }
            }

            var pointIdAreas = new List<Point>();
            for (var x = 0; x < area.GetLength(0); x++)
            {
                for (var y = 0; y < area.GetLength(1); y++)
                {
                    pointIdAreas.Add(new Point(area[x, y], $"{x},{y}"));
                }
            }

            for (var x = 0; x < area.GetLength(0); x++)
            {
                pointIdAreas.RemoveAll(point => point.Id == area[x, 0]);
                pointIdAreas.RemoveAll(point => point.Id == area[x, area.GetLength(1) - 1]);
            }
            for (var y = 0; y < area.GetLength(1); y++)
            {
                pointIdAreas.RemoveAll(point => point.Id == area[0, y]);
                pointIdAreas.RemoveAll(point => point.Id == area[area.GetLength(0) - 1, y]);
            }

            var safestAreaSize = pointIdAreas
                                    .GroupBy(x => x.Id)
                                    .Select(x => x.Count())
                                    .OrderByDescending(x => x)
                                    .First();

            Console.WriteLine($"The answer is {safestAreaSize}");
        }

        private static int Distance(Point source, Point destination)
        {
            return Math.Abs(destination.X - source.X) + Math.Abs(destination.Y - source.Y);
        }

        private static int[,] DetermineArea(List<Point> points)
        {
            var highX = 0;
            var highY = 0;

            foreach (var point in points)
            {
                if (point.X > highX)
                {
                    highX = point.X;
                }
                if (point.Y > highY)
                {
                    highY = point.Y;
                }
            }

            return new int[highX, highY];
        }
    }

    class Point
    {
        public int Id { get; }
        public int X { get; }
        public int Y { get; }

        public Point(int id, string values)
        {
            Id = id;
            var inputValues = values.Split(',');
            X = Int32.Parse(inputValues[0]);
            Y = Int32.Parse(inputValues[1]);
        }
    }
}
