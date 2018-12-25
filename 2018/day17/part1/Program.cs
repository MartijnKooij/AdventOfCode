using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    public static class Program
    {
        private const string Water = "~";
        private const string StreamingWater = "|";
        private const string OpenSpace = ".";
        private const string Clay = "#";

        private static int minX;
        private static int minY;
        private static int maxX;
        private static int maxY;

        public static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var map = new string[610, 1900];
            for (var y = 0; y < map.GetLength(1); y++)
            {
                for (var x = 0; x < map.GetLength(0); x++)
                {
                    if (x == 500 && y == 0)
                    {
                        map[x, y] = "+";
                    }
                    else
                    {
                        map[x, y] = OpenSpace;
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
                        map[x, y] = Clay;
                    }
                }
            }

            minY = 1;
            maxY = allYValues.Max();
            minX = allXValues.Min();
            maxX = allXValues.Max();

            map[500, 1] = StreamingWater;
            var changes = new List<Change>
            {
                new Change(StreamingWater, (500, 1))
            };
            var keepLooping = true;
            while (keepLooping)
            {
                keepLooping = ProcessChanges(changes, map);
            }

            LogMap(map, allXValues, allYValues);
        }

        private static bool ProcessChanges(List<Change> changes, string[,] map)
        {
            for (var changeIndex = changes.Count - 1; changeIndex >= 0; changeIndex--)
            {
                var change = changes[changeIndex];
                switch (change.Value)
                {
                    case StreamingWater:
                        {
                            if (IsOnTopOf(map, change, Clay) || IsOnTopOf(map, change, Water))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y, Water);
                            }
                            else if (IsNextTo(map, change, OpenSpace))
                            {
                                RegisterChange(changes, map, change.Location.x - 1, change.Location.y, StreamingWater);
                                RegisterChange(changes, map, change.Location.x + 1, change.Location.y, StreamingWater);
                            }
                            else
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y + 1, StreamingWater);
                            }

                            break;
                        }
                    case Water:
                        {
                            if (IsOnTopOf(map, change, Clay) || IsOnTopOf(map, change, Water))
                            {
                                if (IsRightOf(map, change, OpenSpace))
                                {
                                    RegisterChange(changes, map, change.Location.x - 1, change.Location.y, Water);
                                }
                                if (IsLeftOf(map, change, OpenSpace))
                                {
                                    RegisterChange(changes, map, change.Location.x + 1, change.Location.y, Water);
                                }
                                if (IsNextTo(map, change, Clay) && IsBelow(map, change, StreamingWater))
                                {
                                    RegisterChange(changes, map, change.Location.x, change.Location.y - 1, Water);
                                }
                            }
                            else if (IsOnTopOf(map, change, OpenSpace))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y, StreamingWater);
                            }

                            break;
                        }
                }

                //Remove this change from the queue
                changes.Remove(change);

                if (Console.ReadKey(true).Key == ConsoleKey.Escape)
                {
                    Console.WriteLine("Canceling...");
                    return false;
                }
            }

            return changes.Any();
        }

        private static bool IsBelow(string[,] map, Change change, string element)
        {
            return map[change.Location.x, change.Location.y - 1] == element;
        }

        private static bool HasElementOnBothSides(string[,] map, Change change, string element)
        {
            return map[change.Location.x - 1, change.Location.y] == element &&
                   map[change.Location.x + 1, change.Location.y] == element;
        }

        private static bool IsNextTo(string[,] map, Change change, string element)
        {
            return map[change.Location.x - 1, change.Location.y] == element ||
                   map[change.Location.x + 1, change.Location.y] == element;
        }

        private static bool IsLeftOf(string[,] map, Change change, string element)
        {
            return map[change.Location.x + 1, change.Location.y] == element;
        }

        private static bool IsRightOf(string[,] map, Change change, string element)
        {
            return map[change.Location.x - 1, change.Location.y] == element;
        }

        private static bool IsOnTopOf(string[,] map, Change change, string element)
        {
            return map[change.Location.x, change.Location.y + 1] == element;
        }

        private static void RegisterChange(ICollection<Change> changes, string[,] map, int newX, int newY, string newChange)
        {
            if (!CheckBounds(newX, newY))
            {
                return;
            }

            map[newX, newY] = newChange;

            changes.Add(new Change(newChange, (newX, newY)));
        }

        private static bool CheckBounds(int newX, int newY)
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
                    var line = new StringBuilder();
                    for (var x = allXValues.Min() - 1; x < allXValues.Max() + 1; x++)
                    {
                        line.Append(map[x, y]);
                    }
                    file.WriteLine(line);
                }
            }
        }

        private static int[] ParseValue(string value)
        {
            value = value.Trim().Replace("x=", "").Replace("y=", "").Replace("..", OpenSpace);
            var values = value.Split('.').Select(int.Parse);
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
