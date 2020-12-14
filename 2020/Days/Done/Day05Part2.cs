using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{

    public class Day05Part2 : BaseDay
    {
        private class Command
        {
            public List<char> RowCommands;
            public List<char> ColumnCommands;
        }

        protected override void PrepareImpl()
        {
            commands = File.ReadAllLines(InputsPath + "day05-part1.txt").Select((line) =>
            {
                var command = new Command();
                command.RowCommands = line.Substring(0, 7).ToCharArray().ToList();
                command.ColumnCommands = line.Substring(7).ToCharArray().ToList();

                return command;
            }).ToImmutableArray();
        }

        protected override void SolveImpl()
        {
            foreach (var command in commands)
            {
                var row = RunCommand(command.RowCommands, 0, 128, 'F');
				var column = RunCommand(command.ColumnCommands, 0, 8, 'L');
				var seatId = row * 8 + column;

				seatIds.Add(seatId);
            }

            seatIds.Sort();
            for (int seat = 0; seat < seatIds.Count; seat++)
            {
                if (!seatIds.Contains(seat))
                {
                    Log($"Seat ID is missing: {seat}");
                }
            }
			answer = seatIds.Max();
        }

        private int RunCommand(List<char> commands, int min, int max, char lowerCommand)
        {
            if (!commands.Any())
            {
                return min;
            }

            int half = min + (int)Math.Ceiling((double)(max - min) / 2.0);
            var command = commands[0];
            commands.RemoveAt(0);

            return command == lowerCommand ?
                RunCommand(commands, min, half - 1, lowerCommand) :
            	RunCommand(commands, half, max, lowerCommand);
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private ImmutableArray<Command> commands;
		private List<int> seatIds = new List<int>();
    }
}
