using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    class Program
    {
        static void Main()
        {
            var currentX = 500;
            var currentY = 0;

            var input = File.ReadAllLines("input.txt");
            var map = new string[610, 1900];
            for (var y = 0; y < map.GetLength(1); y++)
            {
                for (var x = 0; x < map.GetLength(0); x++)
                {
                    if (x == currentX && y == currentY)
                    {
                        map[x, y] = "+";
                    }
                    else
                    {
                        map[x, y] = ".";
                    }

                }
            }

            var allXValues = new List<int>();
            var allYValues = new List<int>();
            foreach (var line in input)
            {
                var values = line.Split(',');
                int[] xValues;
                int[] yValues;
                if (values[0].Trim().StartsWith("x"))
                {
                    xValues = ParseValue(values[0]);
                    yValues = ParseValue(values[1]);
                }
                else
                {
                    yValues = ParseValue(values[0]);
                    xValues = ParseValue(values[1]);
                }

                foreach (var x in xValues)
                {
                    if (!allXValues.Contains(x)) allXValues.Add(x);
                    foreach (var y in yValues)
                    {
                        if (!allYValues.Contains(y)) allYValues.Add(y);
                        map[x, y] = "#";
                    }
                }
            }

            var minY = 1;
            var maxY = allYValues.Max();
            var minX = allXValues.Min();
            var maxX = allXValues.Max();

            currentX = currentX + 0;
            currentY = currentY + 1;
            map[currentX, currentY] = "|";
            var changes = new List<Change>
            {
                new Change("|", (currentX, currentY))
            };
            var keepLooping = true;
            while (keepLooping)
            {
                keepLooping = ProcessChanges(changes, map, currentX, currentY, minX, minY, maxX, maxY);
            }

            LogMap(map, allXValues, allYValues);
        }

        private static bool ProcessChanges(List<Change> changes, string[,] map, int currentX, int currentY, int minX, int minY, int maxX, int maxY)
        {
            for (int c = changes.Count - 1; c >= 0; c--)
            {
                Change change = changes[c];
                if (change.Value == "|")
                {
                    var newX = change.Location.x;
                    var newY = change.Location.y + 1;
                    if (!CheckBounds(newX, newY, minX, minY, maxX, maxY))
                    {
                        changes.Remove(change);
                        continue;
                    }
                    map[newX, newY] = "|";

                    changes.Add(new Change("|", (newX, newY)));
                    changes.Remove(change);
                }
            }

            return changes.Any();
        }

        private static bool CheckBounds(int newX, int newY, int minX, int minY, int maxX, int maxY)
        {
            return newX >= minX && newY >= minY && newX <= maxX && newY <= maxY;
        }

        private static void LogMap(string[,] map, List<int> allXValues, List<int> allYValues)
        {
            Console.WriteLine($"Grid is of size {allXValues.Min()},{allYValues.Min()} - {allXValues.Max()},{allYValues.Max()}");

            File.WriteAllText("output.txt", "");
            using (var file = new StreamWriter("output.txt", true, Encoding.ASCII))
            {
                for (var y = 0; y < allYValues.Max() + 1; y++)
                {
                    var line = "";
                    for (var x = allXValues.Min() - 1; x < allXValues.Max() + 1; x++)
                    {
                        line += map[x, y];
                    }
                    file.WriteLine(line);
                }
            }
        }

        private static int[] ParseValue(string value)
        {
            value = value.Trim().Replace("x=", "").Replace("y=", "").Replace("..", ".");
            var values = value.Split('.').Select(x => int.Parse(x));
            var valueList = values.ToList();

            if (valueList.Count <= 1)
            {
                return valueList.ToArray();
            }

            var length = valueList[1] - valueList[0];
            for (var i = 1; i < length; i++)
            {
                valueList.Insert(i, valueList[0] + i);
            }

            return valueList.ToArray();
        }
    }

    public class Change
    {
        public Change(string value, (int x, int y) location)
        {
            Value = value;
            Location = location;
        }

        public string Value { get; set; }
        public (int x, int y) Location { get; set; }
    }
}
