using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputs = File.ReadAllLines("inputs.txt");
            var squares = ParseInputs(inputs);
            var overlappingPoints = new int[1200, 1200];

            for (int i = 0; i < squares.Count; i++)
            {
                var square1 = squares[i];
                for (int j = i + 1; j < squares.Count; j++)
                {
                    var square2 = squares[j];
                    if (square1.IntersectsWith(square2))
                    {
                        var overlappingSquare = Rectangle.Intersect(square1, square2);
                        if (!overlappingSquare.IsEmpty)
                        {
                            for (int width = 0; width < overlappingSquare.Width; width++)
                            {
                                for (int height = 0; height < overlappingSquare.Height; height++)
                                {
                                    overlappingPoints[overlappingSquare.X + width, overlappingSquare.Y + height] += 1;
                                }
                            }
                        }
                    }
                }
            }

            var overlappingSurface = 0;
            for (int x = 0; x < 1200; x++)
            {
                for (int y = 0; y < 1200; y++)
                {
                    if (overlappingPoints[x, y] > 0)  {
                        overlappingSurface++;
                    }
                }
            }

            Console.WriteLine($"The answer is: {overlappingSurface}");
        }

        private static List<Rectangle> ParseInputs(string[] inputs)
        {
            var squares = new List<Rectangle>();
            foreach (var input in inputs)
            {
                //Input has format 1 56,249 24x16
                var row = input.Split(' ');
                var position = row[1].Split(',');
                var size = row[2].Split('x');

                var rectangle = new Rectangle(Int32.Parse(position[0]), Int32.Parse(position[1]), Int32.Parse(size[0]), Int32.Parse(size[1]));
                squares.Add(rectangle);
            }

            return squares;
        }
    }
}
