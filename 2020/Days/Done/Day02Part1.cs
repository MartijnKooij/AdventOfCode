using System;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day02Part1 : BaseDay
    {
        private class PasswordCheck
        {
            public PasswordCheck(string policy)
            {
                // 11-12 n: frpknnndpntnncnnnnn
                var parts = policy.Split(new char[] { '-', ' ', ':' }, StringSplitOptions.RemoveEmptyEntries);
				MinOccurrence = int.Parse(parts[0]);
				MaxOccurrence = int.Parse(parts[1]);
				Character = char.Parse(parts[2]);
				Password = parts[3];
            }

			public bool IsValid()
			{
				var count = Password.Count(c => c == Character);

				return count >= MinOccurrence && count <= MaxOccurrence;
			}

            public int MinOccurrence { get; set; }
            public int MaxOccurrence { get; set; }
            public char Character { get; set; }
            public string Password { get; set; }
        }

        protected override void PrepareImpl()
        {
            _input = File.ReadAllLines(InputsPath + "day02-part1.txt").Select((line) => new PasswordCheck(line)).ToImmutableArray();
        }

        protected override void SolveImpl()
        {
			_answer = _input.Count(p => p.IsValid());
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + _answer);
        }

        private int _answer;
        private ImmutableArray<PasswordCheck> _input;
    }
}
