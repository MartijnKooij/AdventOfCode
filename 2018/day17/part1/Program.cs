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
            var changes = new SortedSet<Change>(new OrderedChangeComparer())
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

        private static bool ProcessChanges(SortedSet<Change> changes, string[,] map)
        {
            while (changes.Count > 0)
            {
                var change = changes.First();
                changes.Remove(change);

                if (change.Location == (529, 133))
                {
                    change.Location = change.Location;
                }
                switch (change.Value)
                {
                    case StreamingWater:
                        {
                            if (IsOnTopOf(map, change, Clay) || IsOnTopOf(map, change, Water))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y, Water);
                            }

                            if (IsOnTopOf(map, change, OpenSpace))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y + 1, StreamingWater);
                            }

                            break;
                        }
                    case Water:
                        {
                            if (IsOnTopOf(map, change, OpenSpace))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y, StreamingWater);
                            }

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
                            }

                            if (IsBelow(map, change, StreamingWater) && IsBoxed(change, map))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y - 1, Water, 1);
                            }

                            if (IsBelow(map, change, StreamingWater) && IsOnTopOf(map, change, Clay))
                            {
                                RegisterChange(changes, map, change.Location.x, change.Location.y - 1, Water, 1);
                            }

                            if (IsRightOf(map, change, StreamingWater))
                            {
                                RegisterChange(changes, map, change.Location.x - 1, change.Location.y, Water);
                            }
                            if (IsLeftOf(map, change, StreamingWater))
                            {
                                RegisterChange(changes, map, change.Location.x + 1, change.Location.y, Water);
                            }

                            break;
                        }
                }

                if (!changes.Any())
                {
                    Console.WriteLine($"Last change was: {change}");
                }

                if (Console.KeyAvailable)
                {
                    if (Console.ReadKey(true).Key == ConsoleKey.Escape)
                    {
                        Console.WriteLine("Canceling...");
                        return false;
                    }
                }
            }

            return changes.Any();
        }

        private static bool IsBoxed(Change change, string[,] map)
        {
            var leftX = change.Location.x;
            var rightX = change.Location.x;
            var foundLeftBox = false;
            var foundRightBox = false;
            while (true)
            {
                if (!foundLeftBox) leftX--;
                if (!foundRightBox) rightX++;

                if (!IsInBounds(leftX, change.Location.y) || !IsInBounds(rightX, change.Location.y))
                {
                    return false;
                }

                if (IsOnTopOf(map, new Change("", (leftX, change.Location.y)), OpenSpace))
                {
                    return false;
                }
                if (IsOnTopOf(map, new Change("", (rightX, change.Location.y)), OpenSpace))
                {
                    return false;
                }

                if (map[leftX, change.Location.y] == Clay)
                {
                    foundLeftBox = true;
                }
                if (map[rightX, change.Location.y] == Clay)
                {
                    foundRightBox = true;
                }

                if (foundLeftBox && foundRightBox)
                {
                    return true;
                }
            }
        }

        private static bool IsBelow(string[,] map, Change change, string element)
        {
            return map[change.Location.x, change.Location.y - 1] == element;
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

        private static void RegisterChange(SortedSet<Change> changes, string[,] map, int newX, int newY, string newChange, int order = 0)
        {
            if (!IsInBounds(newX, newY))
            {
                return;
            }

            map[newX, newY] = newChange;

            changes.Add(new Change(newChange, (newX, newY), order));
        }

        private static bool IsInBounds(int newX, int newY)
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
                    //for (var x = allXValues.Min() - 1; x < allXValues.Max() + 1; x++)
                    for (var x = 0; x < allXValues.Max() + 1; x++)
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

    public class OrderedChangeComparer : IComparer<Change>
    {
        public int Compare(Change x, Change y)
        {
            if (x == null || y == null)
                return 0;

            if (x.Order == y.Order)
                return x.Location == y.Location ? 0 : -1;

            if (x.Order < y.Order)
                return -1;

            if (x.Order > y.Order)
                return 1;


            return 0;
        }
    }

    public class Change
    {
        public Change(string value, (int x, int y) location)
        {
            Value = value;
            Location = location;
            Order = 0;
        }

        public Change(string value, (int x, int y) location, int order)
        {
            Value = value;
            Location = location;
            Order = order;
        }

        public string Value { get; set; }
        public (int x, int y) Location { get; set; }
        public int Order { get; set; }

        public override string ToString()
        {
            return $"{Value} at ({Location.x},{Location.y})";
        }
    }
}
