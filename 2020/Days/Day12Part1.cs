using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day12Part1 : BaseDay
    {
        protected override void PrepareImpl()
        {
            input = File.ReadAllLines(InputsPath + "day12-part1.txt").Select(l => new Instruction(l)).ToList();
        }

        protected override void SolveImpl()
        {
            var x = 0;
            var y = 0;
            var currentDirection = 0;
            var directions = new Dictionary<int, char>() {
                { 0, 'E' },
                { 90, 'N' },
                { 180, 'W' },
                { 270, 'S' }
            };

            foreach (var instruction in input)
            {
                switch (instruction.Direction)
                {
                    case 'N':
                    case 'E':
                    case 'S':
                    case 'W':
						MoveInDirection(ref x, ref y, instruction.Direction, instruction.Value);
						break;
                    case 'L':
                        currentDirection += instruction.Value;
                        if (currentDirection >= 360)
                        {
                            currentDirection = currentDirection - 360;
                        }
                        break;
                    case 'R':
                        currentDirection -= instruction.Value;
                        if (currentDirection < 0)
                        {
                            currentDirection = 360 - Math.Abs(currentDirection);
                        }
                        break;
                    case 'F':
						MoveInDirection(ref x, ref y, directions[currentDirection], instruction.Value);
                        break;
                }
            }
            answer = ManhattanDistance(0, x, 0, y);
        }

        private void MoveInDirection(ref int x, ref int y, char direction, int value)
        {
            switch (direction)
            {
                case 'N':
                    y += value;
                    break;
                case 'E':
                    x += value;
                    break;
                case 'S':
                    y -= value;
                    break;
                case 'W':
                    x -= value;
                    break;
            }
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private class Instruction
        {
            public char Direction;
            public int Value;

            public Instruction(string line)
            {
                Direction = line[0];
                Value = int.Parse(line.Substring(1));
            }
        }

        private int answer;
        private IList<Instruction> input;
    }
}
