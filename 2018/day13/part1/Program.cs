using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    public static class Program
    {
        public static void Main()
        {
            var lines = File.ReadAllLines("input.txt");

            var grid = ParseGrid(lines);
            var carts = ParseCarts(grid);

            LogGrid(grid);
            var hasCrashed = false;
            while (!hasCrashed)
            {
                try
                {
                    grid = MoveCarts(carts, grid);

                    LogGrid(grid);                    
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    hasCrashed = true;
                }
            }
        }

        private static char[,] MoveCarts(List<Cart> carts, char[,] grid)
        {
            foreach (var cart in carts)
            {
                cart.Move(grid);
                if (cart.MakeTurn(grid)) continue;

                Console.WriteLine($"We have crashed at {cart.Position.X},{cart.Position.Y}");
                throw new Exception("CRASH!");
            }

            return grid;
        }

        private static List<Cart> ParseCarts(char[,] grid)
        {
            var carts = new List<Cart>();
            for (var y = 0; y < grid.GetLength(0); y++)
            {
                for (var x = 0; x < grid.GetLength(1); x++)
                {
                    var trackCharacter = grid[y, x];
                    switch (trackCharacter)
                    {
                        case '^':
                            carts.Add(new Cart(x, y, '^', '|', -1));
                            break;
                        case '>':
                            carts.Add(new Cart(x, y, '>', '-', -1));
                            break;
                        case 'v':
                            carts.Add(new Cart(x, y, 'v', '|', -1));
                            break;
                        case '<':
                            carts.Add(new Cart(x, y, '<', '-', -1));
                            break;
                    }
                }
            }

            return carts;
        }

        private static char[,] ParseGrid(string[] lines)
        {
            var grid = new char[lines.Length, lines[0].Length];

            for (var y = 0; y < lines.Length; y++)
            {
                var line = lines[y];
                for (var x = 0; x < line.Length; x++)
                {
                    var trackCharacter = line[x];
                    if (trackCharacter == ' ')
                    {
                        continue;
                    }

                    grid[y, x] = trackCharacter;
                }
            }

            return grid;
        }

        private static void LogGrid(char[,] grid)
        {
            var gridLog = string.Join("", grid.OfType<char>()
                .Select((value, index) => new { value, index })
                .GroupBy(x => x.index / grid.GetLength(1))
                .Select(x => $"{string.Join("", x.Select(y => y.value))}" + Environment.NewLine));

            Console.WriteLine(gridLog);
        }
    }

    public class Cart
    {
        public char Direction { get; set; }
        public char TrackBelow { get; set; }
        public Point Position { get; set; }
        public int Turn { get; set; }

        public void Move(char[,] grid)
        {
            grid[Position.Y, Position.X] = TrackBelow;

            switch (Direction)
            {
                case '^':
                    Position.Y = Position.Y - 1;
                    break;
                case '>':
                    Position.X = Position.X + 1;
                    break;
                case 'v':
                    Position.Y = Position.Y + 1;
                    break;
                case '<':
                    Position.X = Position.X - 1;
                    break;
            }

            TrackBelow = grid[Position.Y, Position.X];
            grid[Position.Y, Position.X] = Direction;
        }

        internal bool MakeTurn(char[,] grid)
        {
            switch (TrackBelow)
            {
                case '<':
                case '>':
                case '^':
                case 'v':
                    //BOOM!
                    return false;
                case '|':
                case '-':
                    return true;
                case '+':
                    MakeTurn();
                    break;
                case '\\':
                    MakeTurnForBackwardSlash();
                    break;
                case '/':
                    MakeTurnForForwardSlash();
                    break;
            }

            return true;
        }

        private void MakeTurnForBackwardSlash()
        {
            switch (Direction)
            {
                case '>':
                    Direction = 'v';
                    break;
                case '<':
                    Direction = '^';
                    break;
                case '^':
                    Direction = '<';
                    break;
                case 'v':
                    Direction = '>';
                    break;
            }
        }

        private void MakeTurnForForwardSlash()
        {
            switch (Direction)
            {
                case '>':
                    Direction = '^';
                    break;
                case '<':
                    Direction = 'v';
                    break;
                case '^':
                    Direction = '>';
                    break;
                case 'v':
                    Direction = '<';
                    break;
            }
        }

        private void MakeTurn()
        {
            var moves = new[] {'^', '<', 'v', '>'};
            var currentMove = -1;
            for (var i = 0; i < moves.Length; i++)
            {
                var c = moves[i];
                if (c != Direction) continue;
                currentMove = i;
                break;
            }

            var newDirection = currentMove - Turn;
            if (newDirection < 0) newDirection = 3;
            if (newDirection > 3) newDirection = 0;

            Direction = moves[newDirection];
            Turn += 1;
            if (Turn > 1) Turn = -1;
        }

        public Cart(int x, int y, char direction, char trackBelow, int turn)
        {
            Position = new Point {X = x, Y = y};
            Direction = direction;
            TrackBelow = trackBelow;
            Turn = turn;
        }
    }

    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
