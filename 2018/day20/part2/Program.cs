using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using RoyT.AStar;

namespace part2
{
    public static class Program
    {
        public static void Main()
        {
            var directions = File.ReadAllText("input.txt");
            var map = new string[500, 500];
            const int startX = 250;
            const int startY = 250;
            var x = startX;
            var y = startY;

            FillMap(map);

            map[x, y] = "X";
            var position = 0;

            Travel(map, x, y, directions, ref position);

            var grid = CreatePathFindingGrid(map);
            var roomsWithLongPath = CountRoomsWithLongPath(startX, startY, grid, map);

            Console.WriteLine($"The number of rooms is {roomsWithLongPath}.");
            LogMap(map);
        }

        private static int CountRoomsWithLongPath(int startX, int startY, Grid grid, string[,] map)
        {
            var start = new Position(startX, startY);
            var roomCount = 0;
            for (var y = 0; y < map.GetLength(1); y++)
            {
                for (var x = 0; x < map.GetLength(0); x++)
                {
                    if (map[x, y] == " ")
                    {
                        var path = grid.GetPath(start, new Position(x, y), MovementPatterns.LateralOnly);
                        if (path.Length >= 2000)
                        {
                            roomCount++;
                        }
                    }
                }
            }

            return roomCount;
        }

        private static void Travel(string[,] map, int x, int y, string directions, ref int position)
        {
            var startingX = x;
            var startingY = y;

            while (position < directions.Length)
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
                        Travel(map, x, y, directions, ref position);
                        break;
                    case ')':
                        return;
                    default:
                        MoveToDirection(map, ref x, ref y, direction);
                        break;
                }
            }
        }

        private static void MoveToDirection(string[,] map, ref int x, ref int y, char direction)
        {
            var doorX = x + DoorDirectionOffsets[direction].x;
            var doorY = y + DoorDirectionOffsets[direction].y;
            x = x + MoveDirectionOffsets[direction].x;
            y = y + MoveDirectionOffsets[direction].y;

            map[doorX, doorY] = "+";
            map[x, y] = " ";
        }

        private static Grid CreatePathFindingGrid(string[,] grid)
        {
            var pathGrid = new Grid(grid.GetLength(0), grid.GetLength(1));

            for (var y = 0; y < grid.GetLength(1); y++)
            {
                for (var x = 0; x < grid.GetLength(0); x++)
                {
                    if (grid[x, y] == "#" || grid[x, y] == "X")
                    {
                        pathGrid.BlockCell(new Position(x, y));
                    }
                }
            }

            return pathGrid;
        }

        private static void LogMap(string[,] map)
        {
            File.WriteAllText("output.txt", "");
            using (var file = new StreamWriter("output.txt", true, Encoding.ASCII))
            {
                for (var y = 0; y < map.GetLength(1); y++)
                {
                    var line = new StringBuilder(map.GetLength(0));
                    for (var x = 0; x < map.GetLength(0); x++)
                    {
                        line.Append(map[x, y]);
                    }
                    file.WriteLine(line);
                }
            }
        }

        private static void FillMap(string[,] map)
        {
            for (var y = 0; y < map.GetLength(1); y++)
            {
                for (var x = 0; x < map.GetLength(0); x++)
                {
                    map[x, y] = "#";
                }
            }
        }

        private static readonly Dictionary<char, (int x, int y)> DoorDirectionOffsets = new Dictionary<char, (int x, int y)>{
                {'N', (0, -1)},
                {'E', (1, 0)},
                {'S', (0, 1)},
                {'W', (-1, 0)},
            };
        private static readonly Dictionary<char, (int x, int y)> MoveDirectionOffsets = new Dictionary<char, (int x, int y)>{
                {'N', (0, -2)},
                {'E', (2, 0)},
                {'S', (0, 2)},
                {'W', (-2, 0)},
            };
    }
}
