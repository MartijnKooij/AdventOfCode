using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace part2
{
    class Program
    {
        private static List<Point> crossings = new List<Point>();
        private static Hashtable points = new Hashtable();

        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input");
            string[] wire1 = input[0].Split(",");
            string[] wire2 = input[1].Split(",");

            RunWire(wire1, true);
            RunWire(wire2, false);

            Console.WriteLine(crossings.Count());

            var minLength = crossings.OrderBy((p) => p.Length).First().Length;

            Console.WriteLine(minLength);
        }

        private static void RunWire(string[] wire, bool isFirstWire)
        {
            var start = new Point(0, 0, 0);

            foreach (var direction in wire)
            {
                var directionCode = direction.Substring(0, 1);
                var length = short.Parse(direction.Substring(1));
                switch (directionCode)
                {
                    case "R":
                        AddPoints(start, length, 1, 0, isFirstWire);
                        break;
                    case "L":
                        AddPoints(start, length, -1, 0, isFirstWire);
                        break;
                    case "U":
                        AddPoints(start, length, 0, 1, isFirstWire);
                        break;
                    case "D":
                        AddPoints(start, length, 0, -1, isFirstWire);
                        break;
                }
            }
        }

        private static void AddPoints(Point start, short length, short vX, short vY, bool isFirstWire)
        {
            for (int i = 0; i < length; i++)
            {
                start.X += vX;
                start.Y += vY;
                start.Length += 1;
                string hashKey = $"{start.X},{start.Y}";
                var otherPoint = points[hashKey] as Point;

                if (!isFirstWire && otherPoint != null)
                {
                    crossings.Add(new Point(start.X, start.Y, Math.Abs(otherPoint.Length + start.Length)));
                }
                else if (isFirstWire && otherPoint == null)
                {
                    points.Add(hashKey, new Point(start.X, start.Y, start.Length));
                }
            }
        }

        private class Point
        {
            public Point(short x, short y, int length)
            {
                X = x;
                Y = y;
                Length = length;
            }
            public short X { get; set; }
            public short Y { get; set; }
            public int Length { get; set; }
        }
    }
}
