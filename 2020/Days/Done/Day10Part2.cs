using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day10Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            input = File.ReadAllLines(InputsPath + "day10-part1.txt").Select(int.Parse).OrderBy(i => i).ToList();
            input.Insert(0, 0);
            input.Add(input.Max() + 3);
        }

        protected override void SolveImpl()
        {
			var p2factor = 0;
			var p7factor = 0;

            for (int i = 1; i < input.Count - 1; i++)
            {
                var gap = (i >= 3) ? input[i - 3] : -9999;
                if (input[i + 1] - gap == 4)
                {
                    p7factor += 1;
                    p2factor -= 2;
                }
                else if (input[i + 1] - input[i - 1] == 2)
                {
                    p2factor += 1;
                }
            }

            answer = Math.Pow(2, p2factor) * Math.Pow(7, p7factor);
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private double answer;
        private IList<int> input;
    }
}
