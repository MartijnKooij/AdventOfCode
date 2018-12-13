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
            while (true)
            {
                foreach (var trackNode in trackNodes)
                {
                    if (trackNode.HasCart)
                    {
                        if (!trackNode.MoveCart(trackNodes))
                        {
                            lastPosition = trackNode.Position;
                            moving = false;
                            break;
                        }
                    }
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
        public bool HasCart => Cart.CartDirection != ' ';

        public bool MoveCart(List<TrackNode> trackNodes)
        {
            TrackNode nextTrack = null;
            if (Cart.CartDirection == '>')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X + 1 && x.Position.Y == this.Position.Y);
            }
            if (Cart.CartDirection == '<')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X - 1 && x.Position.Y == this.Position.Y);
            }
            if (Cart.CartDirection == 'v')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X && x.Position.Y == this.Position.Y + 1);
            }
            if (Cart.CartDirection == '^')
            {
                nextTrack = trackNodes.First(x => x.Position.X == this.Position.X && x.Position.Y == this.Position.Y - 1);
            }

            if (nextTrack.HasCart)
            {
                //BOOM!
                return false;
            }

            nextTrack.SetCart(this.Cart);
            this.Cart.CartDirection = ' ';
            this.Cart.NextMove = "Left";

            return true;
        }

        private void SetCart(char cart)
        {
            if (this.Direction == '+')
            {

            }

        }

        public TrackNode(char direction, Point position)
        {
            Cart = new Cart(' ', "Left");
            if (direction == '>' || direction == '<')
            {
                Cart.CartDirection = direction;
                direction = '-';
            }
            if (direction == 'v' || direction == '^')
            {
                Cart.CartDirection = direction;
                direction = '|';
            }

            Direction = direction;
            Position = position;
        }
    }

    class Cart
    {
        public char CartDirection { get; set; }

        public string NextMove {get; set;}

        public Cart(char cartDirection, string nextMove)
        {
            CartDirection = cartDirection;
            NextMove = nextMove;
        }

    }
}
