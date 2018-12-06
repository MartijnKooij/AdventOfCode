using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part2
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

            var safeAreaCount = 0;
            for (var x = 0; x < area.GetLength(0); x++)
            {
                for (var y = 0; y < area.GetLength(1); y++)
                {
                    var source = new Point(0, $"{x},{y}");

                    var totalDistance = 0;
                    foreach (var destination in points)
                    {
                        totalDistance += Distance(source, destination);
                    }

                    if (totalDistance < 10000)
                    {
                        safeAreaCount++;
                    }
                }
            }

            Console.WriteLine($"The answer is {safeAreaCount}");
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
