using System;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day02Part2 : BaseDay
    {
        private class PasswordCheck
        {
            public PasswordCheck(string policy)
            {
                // 11-12 n: frpknnndpntnncnnnnn
                var parts = policy.Split(new char[] { '-', ' ', ':' }, StringSplitOptions.RemoveEmptyEntries);
				FirstPosition = int.Parse(parts[0]) - 1;
				SecondPosition = int.Parse(parts[1]) - 1;
				Character = char.Parse(parts[2]);
				Password = parts[3];
            }

			public bool IsValid()
			{
				return Password[FirstPosition] == Character && Password[SecondPosition] != Character || Password[FirstPosition] != Character && Password[SecondPosition] == Character;
			}

            public int FirstPosition { get; set; }
            public int SecondPosition { get; set; }
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
