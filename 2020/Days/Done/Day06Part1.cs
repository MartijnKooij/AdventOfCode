using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day06Part1 : BaseDay
    {
        protected override void PrepareImpl()
        {
            var lines = File.ReadAllLines(InputsPath + "day06-part1.txt");

            var group = new List<char>();
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    input.Add(group.ToList());
                    group.Clear();

                    continue;
                }

                group.AddRange(line.ToCharArray());
            }
            input.Add(group.ToList());
        }

        protected override void SolveImpl()
        {
            answer = input.Select(group => group.Distinct().Count()).Sum();
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private List<List<char>> input = new List<List<char>>();
    }
}
