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

            var runs = 0;
            int yMax = allYValues.Max();
            int xMin = allXValues.Min();
            int xMax = allXValues.Max();
            while (true)
            {
                for (var y = 1; y < yMax + 1; y++)
                {
                    for (var x = xMin - 1; x < xMax + 1; x++)
                    {
                        // On clay
                        if (map[x, y] == "#") continue;

                        // Below source or at stream
                        if (map[x, y - 1] == "+" || map[x, y - 1] == "|")
                        {
                            map[x, y] = "|";
                        }

                        // At stream or at standing water
                        if (map[x, y] == "|" || map[x, y] == "~")
                        {
                            if (map[x, y + 1] == "#")
                            {
                                map[x, y] = "~";
                            }
                        }

                        //Besides stream or standing water
                        if (map[x - 1, y] == "|" || map[x + 1, y] == "|" || map[x - 1, y] == "~" || map[x + 1, y] == "~")
                        {
                            // And on top of clay or standing water
                            if (map[x, y + 1] == "#" || map[x, y + 1] == "~")
                            {
                                // And with walls besides me
                                
                                map[x, y] = "~";
                            }
                        }
                    }
                }

                runs++;
                if (runs > 100) break;
            }


            LogMap(map, allXValues, allYValues);
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
}
