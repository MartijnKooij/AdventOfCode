using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day08Part1 : BaseDay
    {
        private class Program
        {
            private List<Operation> operations = new List<Operation>();

            public int Run()
            {
                var accumulator = 0;
                var index = 0;

                while (true)
                {
                    var operation = operations[index];

                    if (operation.HasExecuted)
                    {
                        return accumulator;
                    }

                    switch (operation.Instruction)
                    {
                        case "acc":
                            accumulator += operation.Argument;
							index += 1;
                            break;
                        case "jmp":
                            index += operation.Argument;
                            break;
                        case "nop":
                            index += 1;
                            break;
                    }

                    operation.HasExecuted = true;
                }
            }

            public void AddOperation(string inputLine)
            {
                var operation = inputLine.Split(' ');

                operations.Add(new Operation(operation[0], int.Parse(operation[1])));
            }
        }

        private class Operation
        {
            public string Instruction;
            public int Argument;
            public bool HasExecuted;

            public Operation(string instruction, int argument)
            {
                Instruction = instruction;
                Argument = argument;
            }
        }

        protected override void PrepareImpl()
        {
            var lines = File.ReadAllLines(InputsPath + "day08-part1.txt");

            foreach (var line in lines)
            {
                program.AddOperation(line);
            }
        }

        protected override void SolveImpl()
        {
            answer = program.Run();
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private Program program = new Program();
    }
}
