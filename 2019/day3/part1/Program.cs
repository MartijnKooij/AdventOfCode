using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace part1
{
    class Program
    {
        private static List<Point> crossings = new List<Point>();
        private static List<Point> points = new List<Point>();

        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input");
            string[] wire1 = input[0].Split(",");
            string[] wire2 = input[1].Split(",");

            RunWire(wire1, true);
            RunWire(wire2, false);

            Console.WriteLine(crossings.Count());

            var minDistance = int.MaxValue;
            foreach (var crossing in crossings)
            {
                var distance = Math.Abs(crossing.X) + Math.Abs(crossing.Y);
                if (distance < minDistance)
                {
                    minDistance = distance;
                }
            }

            Console.WriteLine(minDistance);
        }

        private static List<Point> RunWire(string[] wire, bool storePoints)
        {
            var start = new Point(0, 0);

            foreach (var direction in wire)
            {
                var directionCode = direction.Substring(0, 1);
                var length = int.Parse(direction.Substring(1));
                switch (directionCode)
                {
                    case "R":
                        AddPoints(start, length, 1, 0, storePoints);
                        break;
                    case "L":
                        AddPoints(start, length, -1, 0, storePoints);
                        break;
                    case "U":
                        AddPoints(start, length, 0, 1, storePoints);
                        break;
                    case "D":
                        AddPoints(start, length, 0, -1, storePoints);
                        break;
                }
            }

            return points;
        }

        private static void AddPoints(Point start, int length, int vX, int vY, bool storePoints)
        {
            for (int i = 0; i < length; i++)
            {
                start.X += vX;
                start.Y += vY;
                if (!storePoints && points.Any((p) => p.X == start.X && p.Y == start.Y))
                {
                    crossings.Add(new Point(start.X, start.Y));
                }
                else if (storePoints)
                {
                    points.Add(new Point(start.X, start.Y));
                }
            }
        }

        private class Point
        {
            public Point(int x, int y)
            {
                X = x;
                Y = y;
            }
            public int X { get; set; }
            public int Y { get; set; }
        }
    }
}
