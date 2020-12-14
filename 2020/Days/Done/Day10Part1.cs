using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
	public class Day10Part1: BaseDay
	{
		protected override void PrepareImpl()
		{
			input = File.ReadAllLines(InputsPath + "day10-part1.txt").Select(int.Parse).OrderBy(i => i).ToList();
		}

		protected override void SolveImpl()
		{
			input.Insert(0, 0);
			input.Add(input.Max() + 3);
			var diffs = new List<int>();

			for (int i = 1; i < input.Count; i++)
			{
				diffs.Add(input[i] - input[i-1]);
			}

			answer = diffs.Count(i => i == 1) * diffs.Count(i => i == 3);
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + answer);
		}

		private int answer;
		private IList<int> input;
	}
}
