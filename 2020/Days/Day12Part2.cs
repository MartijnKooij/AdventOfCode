using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day12Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            input = File.ReadAllLines(InputsPath + "day12-part1.txt").Select(l => new Instruction(l)).ToList();
        }

        protected override void SolveImpl()
        {
            var waypointX = 10;
            var waypointY = 1;
            var shipX = 0;
            var shipY = 0;
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
                        MoveInDirection(ref waypointX, ref waypointY, instruction.Direction, instruction.Value);
                        break;
                    case 'L':
                        (waypointX, waypointY) = RotatePoint(waypointX, waypointY, instruction.Value);
                        break;
                    case 'R':
                        (waypointX, waypointY) = RotatePoint(waypointX, waypointY, -instruction.Value);
                        break;
                    case 'F':
                        shipX += instruction.Value * waypointX;
                        shipY += instruction.Value * waypointY;

                        break;
                }
            }
            answer = ManhattanDistance(0, shipX, 0, shipY);
        }

        private (int x, int y) RotatePoint(int x, int y, int degrees)
        {
            if (degrees < 0)
            {
                degrees = 360 - Math.Abs(degrees);
            }
            var newX = 0;
            var newY = 0;
            if (degrees == 0 || degrees == 360)
            {
                newX = x;
                newY = y;
            }
            else if (degrees == 90)
            {
                newX = y * -1;
                newY = x;
            }
            else if (degrees == 180)
            {
                newX = x * -1;
                newY = y * -1;
            }
            else if (degrees == 270)
            {
                newX = y;
                newY = x * -1;
            }

            return (newX, newY);
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
