using System;
using System.Collections.Generic;
using System.IO;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var directions = File.ReadAllText("input.txt");
            var map = new char[500, 500];
            var x = 250;
            var y = 250;

            map[x, y] = 'X';
            travel(map, x, y, directions, 0);
        }

        private static void travel(char[,] map, int x, int y, string directions, int position)
        {
            while (true)
            {
                var direction = directions[position];
                position++;

                switch (direction)
                {
                    case '|':
                        break;
                    case '(':
                        break;
                    case ')':
                        break;
                    default:
                        MoveToDirection(map, ref x, ref y, direction);
                }
            }
        }

        private static void MoveToDirection(char[,] map, ref int x, ref int y, char direction)
        {
            var directions = new Dictionary<char, (int x, int y)>{
                {'N', (0, -1)},
                {'E', (1, 0)},
                {'S', (0, 1)},
                {'W', (-1, 0)},
            };

            x = x + directions[direction].x;
            y = y + directions[direction].y;
            map[x, y] = '.';
        }
    }
}
