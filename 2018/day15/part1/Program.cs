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
            // var expectedAnswers = new[] { 27730, 36334, 39514, 27755, 28944, 18740, 12744, 10430, 10234, 9933, 10234 };
            // for (var testFile = 0; testFile < expectedAnswers.Length; testFile++)
            // {
            //     var lines = File.ReadAllLines($"testinput{testFile}.txt");
            //     var answer = Battle(lines);
            //     if (answer != expectedAnswers[testFile])
            //     {
            //         throw new InvalidOperationException($"Test input {testFile} did not produce the expected answer of {expectedAnswers[testFile]} but gave {answer}");
            //     }
            // }

            var lines = File.ReadAllLines($"testinput10.txt");
            Battle(lines);
        }

        private static int Battle(IReadOnlyList<string> input)
        {
            var players = InitializePlayers(input);
            var grid = InitializeGrid(input);

            var turns = 0;
            while (true)
            {
                var orderedPlayers = players.OrderBy(x => x.Position.Y).ThenBy(x => x.Position.X).ToImmutableArray();
                foreach (var player in orderedPlayers)
                {
                    if (IsBattleOver(orderedPlayers))
                    {
                        var answer = FinalizeAnswer(players, turns, grid);

                        return answer;
                    }

                    if (player.IsDead) continue;

                    var (nearestReachableEnemyPosition, nearestReachableEnemy) = player.GetNearestReachableEnemy(orderedPlayers, grid, false);
                    if (nearestReachableEnemy == null)
                    {
                        //No reachable enemies, have some hot chocolate while you wait...
                        continue;
                    }

                    //Check if we can stretch our arms far enough to hit our enemy.
                    if (!IsInHittingRange(player, nearestReachableEnemy))
                    {
                        MoveTowardsEnemyPosition(player, nearestReachableEnemyPosition, grid);
                    }

                    if (!IsInHittingRange(player, nearestReachableEnemy))
                    {
                        //Keep on walking, closing in on our target!
                        continue;
                    }

                    var (_, weakestNearbyEnemy) = player.GetNearestReachableEnemy(orderedPlayers, grid, true);

                    //HIT HIM!!!!
                    weakestNearbyEnemy.Hit();

                    if (weakestNearbyEnemy.IsDead)
                    {
                        grid[weakestNearbyEnemy.Position.X, weakestNearbyEnemy.Position.Y] = '.';
                    }
                }

                players.RemoveAll(x => x.IsDead);

                turns++;

                LogGrid(grid, players, turns);
            }
        }

        private static int FinalizeAnswer(List<Player> players, int turns, char[,] grid)
        {
            players.RemoveAll(x => x.IsDead);

            var totalHitPointsLeft = players.Sum(x => x.HitPoints);
            var answer = turns * totalHitPointsLeft;

            LogGrid(grid, players, turns);

            Console.WriteLine(
                $"The battle is over after {turns} turns with {totalHitPointsLeft} HP left. The answer is {answer}");

            return answer;
        }

        private static void MoveTowardsEnemyPosition(Player player, Position enemyPosition, char[,] grid)
        {
            var oldPosition = player.Position;
            var newPosition = player.MoveToNearestEnemyPosition(enemyPosition, grid);

            grid[oldPosition.X, oldPosition.Y] = '.';
            grid[newPosition.X, newPosition.Y] = player.Type;
        }

        private static bool IsInHittingRange(Player player, Player nearestReachableEnemy)
        {
            return Distance(player.Position, nearestReachableEnemy.Position) <= 1;
        }

        private static bool IsBattleOver(IEnumerable<Player> players)
        {
            var alivePlayers = players.Where(x => !x.IsDead).ToList();

            var firstType = alivePlayers.First().Type;
            return alivePlayers.All(x => x.Type == firstType);
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

        public (Position position, Player player) GetNearestReachableEnemy(
            IReadOnlyList<Player> players,
            char[,] grid,
            bool weakestFirst
            )
        {
            var offsets = new[] { new Offset(0, -1), new Offset(-1, 0), new Offset(1, 0), new Offset(0, 1) };

            var enemies = players.Where(x => x.Type != Type && !x.IsDead);
            var targetPositionedEnemies = new List<Player>();
            foreach (var enemy in enemies)
            {
                targetPositionedEnemies.AddRange(offsets
                    .Select(offset => new Player
                    {
                        HitPoints = enemy.HitPoints,
                        Type = enemy.Type,
                        Position = new Position(enemy.Position.X + offset.X, enemy.Position.Y + offset.Y)
                    })
                    .Where(targetEnemy => grid[targetEnemy.Position.X, targetEnemy.Position.Y] != '#'));
            }

            enemies = targetPositionedEnemies.OrderBy(x => weakestFirst ? x.HitPoints : 0)
                .ThenBy(x => x.Position.Y)
                .ThenBy(x => x.Position.X);

            var shortestPath = int.MaxValue;
            Player nearestReachableEnemy = null;
            var nearestReachableEnemyPosition = new Position(int.MaxValue, int.MaxValue);
            foreach (var enemy in enemies)
            {
                var pathGrid = CreatePathFindingGrid(grid, enemy);

                foreach (var offset in offsets)
                {
                    //Get the path distance to the destination in reading order
                    var destination = new Position(enemy.Position.X + offset.X, enemy.Position.Y + offset.Y);
                    var pathToEnemy = pathGrid.GetPath(Position, destination, MovementPatterns.LateralOnly);

                    //No clear path to this enemy found
                    if (pathToEnemy.Length == 0) continue;

                    //No shorter path found
                    if (pathToEnemy.Length >= shortestPath) continue;

                    //Register shortest path
                    shortestPath = pathToEnemy.Length;
                    nearestReachableEnemy = enemy;
                    nearestReachableEnemyPosition = destination;
                }
            }

            return (position: nearestReachableEnemyPosition, player: nearestReachableEnemy);
        }

        public Position MoveToNearestEnemyPosition(
            Position nearestEnemyPosition,
            char[,] grid
            )
        {
            var shortestPathGrid = CreatePathFindingGrid(grid);

            var pathToNearestEnemy =
                shortestPathGrid.GetPath(Position, nearestEnemyPosition, MovementPatterns.LateralOnly);

            //No clear path to this position found
            if (pathToNearestEnemy.Length == 0)
            {
                throw new InvalidOperationException("Cannot move to nearestEnemyPosition anymore?");
            }

            Position = pathToNearestEnemy[1];
            return Position;
        }

        public void Hit()
        {
            HitPoints -= 3;
        }

        private static Grid CreatePathFindingGrid(char[,] grid, Player enemy = null)
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

            if (enemy != null)
            {
                pathGrid.UnblockCell(enemy.Position);
            }

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
