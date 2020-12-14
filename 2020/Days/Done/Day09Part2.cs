using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day09Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            input = File.ReadAllLines(InputsPath + "day09-part1.txt").Select(long.Parse).ToList();
        }

        protected override void SolveImpl()
        {
            var preamble = 25;
            var weakNumber = FindWeakNumber(preamble);

			Log($"Weak number is {weakNumber}");

            for (int i = 0; i < input.Count; i++)
            {
                for (int j = i + 1; j < input.Count; j++)
                {
                    List<long> section = input.GetRange(i, j - i);
					if (section.Sum() == weakNumber)
					{
						answer = section.Min() + section.Max();
						return;
					}
                }
            }
        }

        private long FindWeakNumber(int preamble)
        {
            long weakNumber = 0;
            for (int i = preamble; i < input.Count; i++)
            {
                if (!ContainsSumPair(input.GetRange(i - preamble, preamble), input[i]))
                {
                    weakNumber = input[i];
                    break;
                }
            }

            return weakNumber;
        }

        private bool ContainsSumPair(List<long> preamble, long v)
        {
            for (int i = 0; i < preamble.Count; i++)
            {
                for (int j = i; j < preamble.Count; j++)
                {
                    if (i == j) continue;

                    if (preamble[i] + preamble[j] == v)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private long answer;
        private List<long> input;
    }
}
