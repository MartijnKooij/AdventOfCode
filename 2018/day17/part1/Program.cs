using System;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            var map = new char[2000, 2000];
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
                    foreach (var y in yValues)
                    {
                        map[x, y] = '#';
                    }
                }
            }

            LogMap(map);
        }

        private static void LogMap(char[,] map)
        {
            File.WriteAllText("output.txt", "");
            using (var file = new StreamWriter("output.txt", true, Encoding.ASCII))
            {
                file.WriteLine("");
                for (var y = 0; y < map.GetLength(1); y++)
                {
                    var line = "";
                    for (var x = 0; x < map.GetLength(0); x++)
                    {
                        line += map[x, y];
                    }
                    file.WriteLine(line);
                    file.WriteLine("");
                }
            }
        }

        private static int[] ParseValue(string value)
        {
            value = value.Trim().Replace("x=", "").Replace("y=", "").Replace("..", ".");
            var values = value.Split('.').Select(x => int.Parse(x));

            return values.ToArray();
        }
    }
}
