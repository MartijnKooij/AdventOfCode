using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day06Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            var lines = File.ReadAllLines(InputsPath + "day06-part1.txt");

            var group = new List<string>();
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    input.Add(group.ToList());
                    group.Clear();

                    continue;
                }

                group.Add(line);
            }
            input.Add(group.ToList());
        }

        protected override void SolveImpl()
        {
            answer = input.Select((group) => {
                var allChars = group.SelectMany(g => g).Distinct();
                var result = 0;

                foreach (var c in allChars)
                {
                    result += group.All(a => a.Contains(c)) ? 1 : 0;
                }

                return result;
            }).Sum();
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private List<List<string>> input = new List<List<string>>();
    }
}
