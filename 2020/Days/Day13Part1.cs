using System.Collections.Generic;
using System.IO;
using Days.Base;
using System.Linq;
using System;

namespace Days
{
	public class Day13Part1: BaseDay
	{
		protected override void PrepareImpl()
		{
			var lines = File.ReadAllLines(InputsPath + "day13-part1.txt");
			departure = int.Parse(lines[0]);
			timestamps = lines[1].Split(',').Where(c => c != "x").Select(int.Parse).ToList();
		}

		protected override void SolveImpl()
		{
			var diffs = timestamps.Select(t => (diff: Math.Abs(departure - (departure - (departure % t) + t)), id: t)).OrderBy(m => m.diff).ToArray();

			answer = diffs[0].id * diffs[0].diff;
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + answer);
		}

		private int answer;
		private IList<int> timestamps;
		private int departure;
	}
}
