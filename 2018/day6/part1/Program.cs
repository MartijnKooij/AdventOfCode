using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            List<Point> points = new List<Point>();
            for (int i = 0; i < input.Length; i++)
            {
                string values = input[i];
                points.Add(new Point(i, values));
            }

            string[,] area = DetermineArea(points);

            for (int x = 0; x < area.GetLength(0); x++)
            {
                for (int y = 0; y < area.GetLength(1); y++)
                {
                    var source = new Point(0, $"{x},{y}");
                    foreach (var destination in points)
                    {
                        int distance = Distance(source, destination);
                    }
                }
            }
        }

        private static int Distance(Point source, Point destination)
        {
            return Math.Abs(destination.X - source.X) + Math.Abs(destination.Y - source.Y);
        }

        private static string[,] DetermineArea(List<Point> points)
        {
            int highX = 0;
            int highY = 0;

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

            return new string[highX, highY];
        }
    }

    class Point {
        public int Id {get;}
        public int X {get;}
        public int Y {get;}
        
        public Point(int id, string values)
        {
            Id = Id;
            var inputValues = values.Split(',');
            X = Int32.Parse(inputValues[0]);
            Y = Int32.Parse(inputValues[1]);
        }
    }
}
