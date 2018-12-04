using System;
using System.Drawing;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part2
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputs = File.ReadAllLines("inputs.txt");
            var squares = ParseInputs(inputs);

            for (int i = 0; i < squares.Count; i++)
            {
                var square1 = squares.ElementAt(i);
                var hasNoIntersection = true;
                for (int j = 0; j < squares.Count; j++)
                {
                    var square2 = squares.ElementAt(j);
                    if (square1.Value.IntersectsWith(square2.Value) && !square1.Equals(square2))
                    {
                        hasNoIntersection = false;
                        break;
                    }
                }

                if (hasNoIntersection) {
                    Console.WriteLine($"The answer is {square1.Key} = {square1.Value}");
                }
            }
        }

        private static Dictionary<string, Rectangle> ParseInputs(string[] inputs)
        {
            var squares = new Dictionary<string, Rectangle>();
            foreach (var input in inputs)
            {
                //Input has format 1 56,249 24x16
                var row = input.Split(' ');
                var id = "#" + row[0];
                var position = row[1].Split(',');
                var size = row[2].Split('x');

                var rectangle = new Rectangle(Int32.Parse(position[0]), Int32.Parse(position[1]), Int32.Parse(size[0]), Int32.Parse(size[1]));
                squares.Add(id, rectangle);
            }

            return squares;
        }

    }
}
