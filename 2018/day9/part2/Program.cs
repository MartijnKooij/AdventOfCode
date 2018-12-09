using System;
using System.Collections.Generic;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main()
        {
            var input = "411 players; last marble is worth 71058 points".Split(' ');
            var players = int.Parse(input[0]);
            var numberOfMarbles = int.Parse(input[6]);
            var currentMarbleIndex = 0;
            var marble = 0;
            var marbles = new List<int> { marble };
            var playerScores = Enumerable.Repeat(0, players).ToArray();
            var player = 0;

            while (true)
            {
                marble++;
                if (marble > numberOfMarbles)
                {
                    break;
                }

                currentMarbleIndex = PlaceMarble(player, marble, currentMarbleIndex, marbles, playerScores);

                player++;
                if (player > players - 1)
                {
                    player = 0;
                }
            }

            var highScore = playerScores.Max();
            Console.WriteLine($"The answer is {highScore}");
        }

        private static int PlaceMarble(int player, int marble, int currentMarbleIndex, List<int> marbles,
            IList<int> playerScores)
        {
            if (marble % 23 == 0)
            {
                playerScores[player] += marble;

                var previousMarbleIndex = currentMarbleIndex - 7;
                if (previousMarbleIndex < 0)
                {
                    previousMarbleIndex = marbles.Count - Math.Abs(previousMarbleIndex);
                }

                playerScores[player] += marbles.ElementAt(previousMarbleIndex);
                marbles.RemoveAt(previousMarbleIndex);

                return previousMarbleIndex;
            }

            return DefaultMove(marble, currentMarbleIndex, marbles);
        }

        private static int DefaultMove(int marble, int currentMarbleIndex, IList<int> marbles)
        {
            var nextIndex = currentMarbleIndex + 2;
            if (nextIndex > marbles.Count)
            {
                nextIndex = nextIndex - marbles.Count;
            }

            marbles.Insert(nextIndex, marble);

            return nextIndex;
        }
    }
}
