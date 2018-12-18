using System;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadAllLines("input.txt");
            char[,] map = ParseMap(lines);

            for (int minute = 0; minute < 10; minute++)
            {
                var temporaryMap = new char[50, 50];
                for (int y = 0; y < map.GetLength(1); y++)
                {
                    for (int x = 0; x < map.GetLength(0); x++)
                    {
                        var surroundings = GetSurroundings(map, x, y);
                    }
                }
            }

            LogMap(map);
        }

        private readonly Offset[] offsets = new[] {
            new Offset(0, -1),
            new Offset(1, -1),
            new Offset(1, 0),
            new Offset(1, 1),
            new Offset(0, 1),
            new Offset(0, -1),
            new Offset(-1, 0),
            new Offset(-1, -1)
            };

        private static char[] GetSurroundings(char[,] map, int x, int y)
        {

        }

        private static char[,] ParseMap(string[] lines)
        {
            var map = new char[50, 50];

            for (int y = 0; y < lines.Length; y++)
            {
                var line = lines[y];
                for (int x = 0; x < line.Length; x++)
                {
                    map[x, y] = line[x];
                }
            }

            return map;
        }

        private static void LogMap(char[,] map)
        {
            for (int y = 0; y < map.GetLength(1); y++)
            {
                var line = "";
                for (int x = 0; x < map.GetLength(0); x++)
                {
                    line += map[x, y];
                }
                Console.WriteLine(line);
            }
        }
    }

    class Offset
    {
        public int X { get; }
        public int Y { get; }

        public Offset(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
