using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
	public class Day01Part2 : BaseDay
	{
		protected override void PrepareImpl()
		{
			_input = File.ReadAllLines(InputsPath + "day01-part1.txt").Select(int.Parse).ToImmutableArray();
		}

		protected override void SolveImpl()
		{
			for (var i = 0; i < _input.Length; i++)
			{
				for (var j = 0; j < _input.Length; j++)
				{
					for (var k = 0; k < _input.Length; k++)
					{
						if (i == j || i == k || j == k) continue;
						if (_input[i] + _input[j] + _input[k] != 2020) continue;

						_answer = _input[i] * _input[j] * _input[k];
						return;
					}
				}
			}
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + _answer);
		}

		private int _answer;
		private ImmutableArray<int> _input;
	}
}