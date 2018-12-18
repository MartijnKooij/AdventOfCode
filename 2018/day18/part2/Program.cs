using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        private const int mapSize = 50;

        static void Main()
        {
            var lines = File.ReadAllLines("input.txt");
            var totalMinutes = 1000000000;
            var map = ParseMap(lines);
            var newMap = new char[mapSize, mapSize];

            var lastPercentage = 0.0;
            for (var minute = 0; minute < totalMinutes; minute++)
            {
                for (var y = 0; y < mapSize; y++)
                {
                    for (var x = 0; x < mapSize; x++)
                    {
                        var surroundings = GetSurroundings(map, x, y);
                        (int treeCount, int lumberCount) = CountSurroundings(surroundings);

                        switch (map[x, y])
                        {
                            case '.':
                                newMap[x, y] = treeCount >= 3 ? '|' : '.';
                                break;
                            case '|':
                                newMap[x, y] = lumberCount >= 3 ? '#' : '|';
                                break;
                            case '#':
                                var hasAtLeastOneLumber = lumberCount >= 1;
                                var hasAtLeastOneTree = treeCount >= 1;
                                newMap[x, y] = hasAtLeastOneLumber && hasAtLeastOneTree ? '#' : '.';
                                break;
                        }
                    }
                }

                map = newMap;

                var percentage = Math.Round(minute / (double)totalMinutes * 100.0, 3);
                if (percentage > lastPercentage)
                {
                    int currentAnswer = ComputeAnswer(map);
                    Console.WriteLine($"{percentage}% done, current answer would be {currentAnswer} ({minute} of {totalMinutes})");
                    lastPercentage = percentage;
                }

                //LogMap(map, minute + 1);
            }

            int answer = ComputeAnswer(map);
            Console.WriteLine($"The answer is {answer}");
        }

        private static (int treeCount, int lumberCount) CountSurroundings(char[] surroundings)
        {
            var treeCount = surroundings.Count(s => s == '|');
            var lumberCount = surroundings.Count(s => s == '#');

            return (treeCount, lumberCount);
        }

        private static int ComputeAnswer(char[,] map)
        {
            var lumberCount = 0;
            var treeCount = 0;
            for (var y = 0; y < mapSize; y++)
            {
                for (var x = 0; x < mapSize; x++)
                {
                    switch (map[x, y])
                    {
                        case '|':
                            treeCount++;
                            break;
                        case '#':
                            lumberCount++;
                            break;
                    }

                }
            }

            int answer = treeCount * lumberCount;
            return answer;
        }

        private static readonly Offset[] Offsets = {
            new Offset(0, -1),
            new Offset(1, -1),
            new Offset(1, 0),
            new Offset(1, 1),
            new Offset(0, 1),
            new Offset(-1, 1),
            new Offset(-1, 0),
            new Offset(-1, -1)
            };

        private static char[] GetSurroundings(char[,] map, int x, int y)
        {
            var surroundings = new List<char>();

            foreach (var offset in Offsets)
            {
                var nearbyX = x + offset.X;
                var nearbyY = y + offset.Y;
                if (nearbyX < 0 || nearbyX >= mapSize || nearbyY < 0 || nearbyY >= mapSize)
                {
                    continue;
                }
                surroundings.Add(map[nearbyX, nearbyY]);
            }

            return surroundings.ToArray();
        }

        private static char[,] ParseMap(string[] lines)
        {
            var map = new char[mapSize, mapSize];

            for (var y = 0; y < lines.Length; y++)
            {
                var line = lines[y];
                for (var x = 0; x < line.Length; x++)
                {
                    map[x, y] = line[x];
                }
            }

            return map;
        }

        private static void LogMap(char[,] map, int minute)
        {
            Console.WriteLine($"Map after {minute} minutes");
            for (var y = 0; y < map.GetLength(1); y++)
            {
                var line = "";
                for (var x = 0; x < map.GetLength(0); x++)
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
