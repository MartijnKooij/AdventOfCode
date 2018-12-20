using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var directions = File.ReadAllText("input.txt");
            var map = new string[500, 500];
            var x = 250;
            var y = 250;

            map[x, y] = "X";
            Travel(map, x, y, directions, 0);
        }

        private static void Travel(string[,] map, int x, int y, string directions, int position)
        {
            var startingX = x;
            var startingY = y;

            while (true)
            {
                var direction = directions[position];
                position++;

                switch (direction)
                {
                    case '|':
                        x = startingX;
                        y = startingY;
                        break;
                    case '(':
                        Travel(map, x, y, directions, position);
                        break;
                    case ')':
                        return;
                    default:
                        MoveToDirection(map, ref x, ref y, direction);
                        break;
                }
                LogMap(map);
            }
        }

        private static void MoveToDirection(string[,] map, ref int x, ref int y, char direction)
        {
            x = x + directionOffsets[direction].x;
            y = y + directionOffsets[direction].y;

            map[x, y] = ".";
        }

        private static void LogMap(string[,] map)
        {
            File.WriteAllText("output.txt", "");
            using (var file = new StreamWriter("output.txt", true, Encoding.ASCII))
            {
                for (var y = 0; y < map.GetLength(1); y++)
                {
                    var line = "";
                    for (var x = 0; x < map.GetLength(0); x++)
                    {
                        line += map[x, y];
                    }
                    file.WriteLine(line);
                }
            }
        }

        private static Dictionary<char, (int x, int y)> directionOffsets = new Dictionary<char, (int x, int y)>{
                {'N', (0, -1)},
                {'E', (1, 0)},
                {'S', (0, 1)},
                {'W', (-1, 0)},
            };
    }
}
