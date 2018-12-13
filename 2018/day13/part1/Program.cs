using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;

namespace part1
{
    public static class Program
    {
        public static void Main()
        {
            var lines = File.ReadAllLines("testinput.txt");
            var trackNodes = ParseInput(lines);

            var moving = true;
            var lastPosition = new Point(-1, -1);

            while (moving)
            {
                var skipTracks = new List<TrackNode>();
                foreach (var trackNode in trackNodes)
                {
                    if (skipTracks.Contains(trackNode))
                    {
                        continue;
                    }
                    if (!trackNode.HasCart)
                    {
                        continue;
                    }

                    var nextTrack = trackNode.MoveCart(trackNodes);
                    if (nextTrack.HasCrashed)
                    {
                        lastPosition = trackNode.Position;
                        moving = false;
                        break;
                    }
                    skipTracks.Add(nextTrack);

                }
            }

            Console.WriteLine($"The answer is {lastPosition.X},{lastPosition.Y}");
        }

        private static List<TrackNode> ParseInput(string[] lines)
        {
            var trackNodes = new List<TrackNode>();
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
                    var trackNode = new TrackNode(trackCharacter, new Point(x, y));

                    trackNodes.Add(trackNode);
                }
            }

            return trackNodes;
        }
    }

    class TrackNode
    {
        public char Direction { get; }

        public Cart Cart { get; set; }
        public Point Position { get; }
        public bool HasCart => Cart != null && Cart.Direction != ' ';

        public bool HasCrashed { get; private set; }

        public TrackNode MoveCart(List<TrackNode> trackNodes)
        {
            TrackNode nextTrack = null;
            switch (Cart.Direction)
            {
                case '>':
                    nextTrack = trackNodes.First(x => x.Position.X == Position.X + 1 && x.Position.Y == Position.Y);
                    break;
                case '<':
                    nextTrack = trackNodes.First(x => x.Position.X == Position.X - 1 && x.Position.Y == Position.Y);
                    break;
                case 'v':
                    nextTrack = trackNodes.First(x => x.Position.X == Position.X && x.Position.Y == Position.Y + 1);
                    break;
                case '^':
                    nextTrack = trackNodes.First(x => x.Position.X == Position.X && x.Position.Y == Position.Y - 1);
                    break;
            }

            if (nextTrack == null)
            {
                throw new InvalidOperationException("Where's my node?");
            }

            if (nextTrack.HasCart)
            {
                //BOOM!
                nextTrack.HasCrashed = true;
                return nextTrack;
            }

            nextTrack.SetCart(Cart);
            Cart.Direction = ' ';

            return nextTrack;
        }

        private void SetCart(Cart cart)
        {
            Cart = cart;

            if (Direction == '+')
            {
                Cart.TakeTurn(cart.Direction);
            }
            switch (Direction)
            {
                case '/':
                {
                    switch (cart.Direction)
                    {
                        case '>':
                            Cart.Direction = '^';
                            break;
                        case '<':
                            Cart.Direction = '<';
                            break;
                        case '^':
                            Cart.Direction = '>';
                            break;
                        case 'v':
                            Cart.Direction = '<';
                            break;
                    }

                    break;
                }
                case '\\':
                {
                    switch (cart.Direction)
                    {
                        case '>':
                            Cart.Direction = 'v';
                            break;
                        case '<':
                            Cart.Direction = '^';
                            break;
                        case '^':
                            Cart.Direction = '<';
                            break;
                        case 'v':
                            Cart.Direction = '>';
                            break;
                    }

                    break;
                }
                default:
                    Cart.Direction = cart.Direction;
                    break;
            }
        }

        public TrackNode(char direction, Point position)
        {
            if (direction == '>' || direction == '<')
            {
                Cart = new Cart(direction);
                direction = '-';
            }
            if (direction == 'v' || direction == '^')
            {
                Cart = new Cart(direction);
                direction = '|';
            }

            Direction = direction;
            Position = position;
        }
    }

    class Cart
    {
        public char Direction { get; set; }

        private short move = -1;

        private readonly char[] moves = { '^', '<', 'v', '>' };

        public void TakeTurn(char cartDirection)
        {
            Direction = cartDirection;

            var currentMove = -1;
            for (var i = 0; i < moves.Length; i++)
            {
                var c = moves[i];
                if (c != Direction) continue;
                currentMove = i;
                break;
            }
            var newDirection = currentMove - move;
            if (newDirection < 0) newDirection = 3;
            if (newDirection > 3) newDirection = 0;

            Direction = moves[newDirection];
            move += 1;
            if (move > 1) move = -1;
        }

        public Cart(char cartDirection)
        {
            Direction = cartDirection;
        }
    }
}
