using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main()
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
                    Console.WriteLine($"{} > {JSON.SnextTrack}")
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
            for (int y = 0; y < lines.Length; y++)
            {
                string line = lines[y];
                for (int x = 0; x < line.Length; x++)
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

        public Cart Cart { get; private set; }
        public Point Position { get; }
        public bool HasCart => Cart.Direction != ' ';

        public bool HasCrashed { get; private set; }

        public TrackNode MoveCart(List<TrackNode> trackNodes)
        {
            TrackNode nextTrack = null;
            if (Cart.Direction == '>')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X + 1 && x.Position.Y == this.Position.Y);
            }
            if (Cart.Direction == '<')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X - 1 && x.Position.Y == this.Position.Y);
            }
            if (Cart.Direction == 'v')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X && x.Position.Y == this.Position.Y + 1);
            }
            if (Cart.Direction == '^')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X && x.Position.Y == this.Position.Y - 1);
            }

            if (nextTrack.HasCart)
            {
                //BOOM!
                nextTrack.HasCrashed = true;
                return nextTrack;
            }

            nextTrack.SetCart(this.Cart);
            this.Cart.Direction = ' ';

            return nextTrack;
        }

        private void SetCart(Cart cart)
        {
            if (this.Direction == '+')
            {
                this.Cart.TakeTurn();
            }
            if (this.Direction == '/')
            {
                if (cart.Direction == '>') this.Cart.Direction = '^';
                if (cart.Direction == '<') this.Cart.Direction = '<';
                if (cart.Direction == '^') this.Cart.Direction = '>';
                if (cart.Direction == 'v') this.Cart.Direction = '<';
            }
            else if (this.Direction == '\\')
            {
                if (cart.Direction == '>') this.Cart.Direction = 'v';
                if (cart.Direction == '<') this.Cart.Direction = '^';
                if (cart.Direction == '^') this.Cart.Direction = '<';
                if (cart.Direction == 'v') this.Cart.Direction = '>';
            }
            else
            {
                this.Cart.Direction = cart.Direction;
            }
        }

        public TrackNode(char direction, Point position)
        {
            Cart = new Cart(' ');
            if (direction == '>' || direction == '<')
            {
                Cart.Direction = direction;
                direction = '-';
            }
            if (direction == 'v' || direction == '^')
            {
                Cart.Direction = direction;
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

        private char[] moves = new[] { '^', '>', 'v', '<' };

        public void TakeTurn()
        {
            var currentMove = -1;
            for (int i = 0; i < moves.Length; i++)
            {
                char c = moves[i];
                if (c == this.Direction)
                {
                    currentMove = i;
                    break;
                }
            }
            var newDirection = currentMove - this.move;
            if (newDirection < 0) newDirection = 3;
            if (newDirection > 3) newDirection = 0;

            this.Direction = moves[newDirection];
            this.move += 1;
            if (this.move > 1) this.move = -1;
        }

        public Cart(char cartDirection)
        {
            Direction = cartDirection;
        }
    }
}
