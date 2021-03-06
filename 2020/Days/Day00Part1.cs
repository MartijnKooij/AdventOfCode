﻿using System.Collections.Generic;
using System.IO;
using Days.Base;

namespace Days
{
	public class Day00Part1: BaseDay
	{
		protected override void PrepareImpl()
		{
			input = File.ReadAllLines(InputsPath + "day00-part1.txt");
		}

		protected override void SolveImpl()
		{
			answer = 0;
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + answer);
		}

		private int answer;
		private IList<string> input;
	}
}
