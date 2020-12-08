using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day08Part2 : BaseDay
    {
        private class Program
        {
            private List<Operation> registeredOperations = new List<Operation>();

            public int Run()
            {
                var iterations = new List<List<Operation>>();
                var possibilities = registeredOperations.Count(o => o.Instruction == "jmp" || o.Instruction == "nop");

                var changeOccurrence = 0;
                for (int variant = 0; variant < possibilities; variant++)
                {
                    iterations.Add(new List<Operation>());
                    bool hasMadeChange = false;

                    for (int i = 0; i < registeredOperations.Count; i++)
                    {
                        var instruction = registeredOperations[i].Instruction;
                        if (!hasMadeChange && i > changeOccurrence && (instruction == "jmp" || instruction == "nop"))
                        {
                            instruction = instruction == "jmp" ? "nop" : "jmp";
                            changeOccurrence = i;
                            hasMadeChange = true;
                        }
                        var operation = new Operation(instruction, registeredOperations[i].Argument);
                        iterations[variant].Add(operation);
                    }
                }

                foreach (var iteration in iterations)
                {
                    var result = RunInternal(iteration);
                    if (result.isCleanExit)
                    {
                        return result.accumulator;
                    }
                }

                return 404;
            }

            private (int accumulator, bool isCleanExit) RunInternal(List<Operation> operations)
            {
                var accumulator = 0;
                var index = 0;

                while (true)
                {
                    if (index >= operations.Count)
                    {
                        return (accumulator, true);
                    }

                    var operation = operations[index];

                    if (operation.HasExecuted)
                    {
                        return (accumulator, false);
                    }

                    var currentInstruction = operation.Instruction;
                    // if (currentInstruction == "jmp")
                    // {
                    //     string nextInstruction = operations[index + 1].Instruction;
                    //     if ((nextInstruction == "nop" || nextInstruction == "acc") && index + 1 == operations.Count -1)
                    //     {
                    //         currentInstruction = "nop";
                    //     }
                    // } else if (currentInstruction == "nop")
                    // {
                    //     string nextInstruction = operations[index + operation.Argument].Instruction;
                    //     if ((nextInstruction == "nop" || nextInstruction == "acc") && index +  operation.Argument == operations.Count -1)
                    //     {
                    //         currentInstruction = "jmp";
                    //     }
                    // }
                    switch (currentInstruction)
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

                registeredOperations.Add(new Operation(operation[0], int.Parse(operation[1])));
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
