using RoyT.AStar;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;

namespace part1
{
    public static class Program
    {
        public static void Main()
        {
            var expectedAnswers = new[] { 27730, 36334, 39514, 27755, 28944, 18740 };
            for (var testFile = 0; testFile < 6; testFile++)
            {
                var lines = File.ReadAllLines($"testinput{testFile}.txt");
                var answer = Battle(lines);
                if (answer != expectedAnswers[testFile])
                {
                    throw new InvalidOperationException($"Test input {testFile} did not produce the expected answer of {expectedAnswers[testFile]} but gave {answer}");
                }
            }
        }

        private static int Battle(IReadOnlyList<string> input)
        {
            var players = InitializePlayers(input);
            var grid = InitializeGrid(input);

            var turns = 0;
            while (true)
            {
                var orderedPlayers = players.OrderBy(x => x.Position.Y).ThenBy(x => x.Position.X);
                foreach (var player in orderedPlayers)
                {
                    if (HasWinner(players.Where(x => !x.IsDead).ToImmutableArray()))
                    {
                        players.RemoveAll(x => x.IsDead);
                        var answer = turns * players.Sum(x => x.HitPoints);

                        LogGrid(grid, players, turns);
                        Console.WriteLine($"The battle is over after {turns} turns with {players.Sum(x => x.HitPoints)} HP left. The answer is {answer}");

                        return answer;
                    }

                    if (player.IsDead) continue;

                    var nearestReachableEnemy = player.GetNearestReachableEnemy(players, grid, false);
                    if (nearestReachableEnemy == null)
                    {
                        //No reachable enemies, have some hot chocolate while you wait...
                        continue;
                    }

                    //Check if we can stretch our arms far enough to hit our enemy.
                    if (Distance(player.Position, nearestReachableEnemy.Position) > 1)
                    {
                        var currentPosition = player.Position;
                        var newPosition = player.MoveToNearestEnemy(nearestReachableEnemy, grid);

                        grid[currentPosition.X, currentPosition.Y] = '.';
                        grid[newPosition.X, newPosition.Y] = player.Type;
                    }

                    if (Distance(player.Position, nearestReachableEnemy.Position) > 1)
                    {
                        //Keep on walking, closing in on our target!
                        continue;
                    }

                    var weakestNearbyEnemy = player.GetNearestReachableEnemy(players, grid, true);

                    //HIT HIM!!!!
                    weakestNearbyEnemy.Hit();

                    if (weakestNearbyEnemy.IsDead)
                    {
                        grid[weakestNearbyEnemy.Position.X, weakestNearbyEnemy.Position.Y] = '.';
                    }
                }

                players.RemoveAll(x => x.IsDead);

                turns++;

                //LogGrid(grid, players, turns);
            }
        }

        private static bool HasWinner(IReadOnlyCollection<Player> players)
        {
            var firstType = players.First().Type;
            if (players.Any(x => x.Type != firstType))
            {
                return false;
            }

            return true;
        }

        private static void LogGrid(char[,] grid, IReadOnlyCollection<Player> players, int turns)
        {
            Console.WriteLine();
            Console.WriteLine($"Turn {turns}");
            for (var y = 0; y < grid.GetLength(1); y++)
            {
                for (var x = 0; x < grid.GetLength(0); x++)
                {
                    Console.Write(grid[x, y]);
                }

                Console.Write(" ");
                foreach (var player in players.Where(x => x.Position.Y == y))
                {
                    Console.Write($"{player.Type}({player.HitPoints})");
                }
                Console.WriteLine();
            }
        }

        private static List<Player> InitializePlayers(IReadOnlyList<string> input)
        {
            var players = new List<Player>();

            for (var y = 0; y < input.Count; y++)
            {
                var row = input[y];
                for (var x = 0; x < row.Length; x++)
                {
                    var type = row[x];
                    var position = new Position(x, y);

                    if (type == 'G' || type == 'E')
                    {
                        players.Add(Player.CreatePlayer(position, type));
                    }
                }
            }

            return players;
        }

        private static char[,] InitializeGrid(IReadOnlyList<string> input)
        {
            var grid = new char[input[0].Length, input.Count];

            for (var y = 0; y < input.Count; y++)
            {
                var row = input[y];
                for (var x = 0; x < row.Length; x++)
                {
                    var type = row[x];
                    grid[x, y] = type;
                }
            }

            return grid;
        }

        private static int Distance(Position source, Position destination)
        {
            return Math.Abs(destination.X - source.X) + Math.Abs(destination.Y - source.Y);
        }
    }

    public class Player
    {
        public char Type { get; set; }
        public Position Position { get; set; }
        public int HitPoints { get; set; }
        public bool IsDead => HitPoints <= 0;

        public Player GetNearestReachableEnemy(IReadOnlyList<Player> players, char[,] grid, bool weakestFirst)
        {
            var enemies = players
                .Where(x => x.Type != Type && !x.IsDead)
                .OrderBy(x => weakestFirst ? x.HitPoints : 0)
                .ThenBy(x => x.Position.Y)
                .ThenBy(x => x.Position.X);

            var shortestPath = int.MaxValue;
            Player nearestReachableEnemy = null;
            foreach (var enemy in enemies)
            {
                var pathGrid = CreatePathFindingGrid(grid, enemy);

                var offsets = new[] { new Offset(0, -1), new Offset(1, 0), new Offset(0, 1), new Offset(-1, 0) };
                foreach (var offset in offsets)
                {
                    var destination = new Position(enemy.Position.X + offset.X, enemy.Position.Y + offset.Y);
                    var pathToEnemy = pathGrid.GetPath(Position, destination, MovementPatterns.LateralOnly);

                    //No clear path to this enemy found
                    if (pathToEnemy.Length == 0) continue;

                    if (pathToEnemy.Length >= shortestPath && pathToEnemy.Length > 0) continue;

                    shortestPath = pathToEnemy.Length;
                    nearestReachableEnemy = enemy;
                }
            }

            return nearestReachableEnemy;
        }

        public void Hit()
        {
            HitPoints -= 3;
        }

        public Position MoveToNearestEnemy(Player nearestEnemy, char[,] grid)
        {
            var shortestPathGrid = CreatePathFindingGrid(grid, nearestEnemy);
            var pathToNearestEnemy = shortestPathGrid.GetPath(
                Position, nearestEnemy.Position, MovementPatterns.LateralOnly);

            Position = pathToNearestEnemy[1];

            return Position;
        }

        private static Grid CreatePathFindingGrid(char[,] grid, Player enemy)
        {
            var pathGrid = new Grid(grid.GetLength(0), grid.GetLength(1));

            for (var y = 0; y < grid.GetLength(1); y++)
            {
                for (var x = 0; x < grid.GetLength(0); x++)
                {
                    if (grid[x, y] == '#' || grid[x, y] == 'G' || grid[x, y] == 'E')
                    {
                        pathGrid.BlockCell(new Position(x, y));
                    }
                }
            }

            pathGrid.UnblockCell(enemy.Position);

            return pathGrid;
        }

        public static Player CreatePlayer(Position position, char type)
        {
            return new Player
            {
                HitPoints = 200,
                Position = position,
                Type = type
            };
        }
    }
}
