using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            var steps = ImportSteps(input);

            foreach (var step in steps)
            {
                var dependencies = step.Dependencies.Select(s => s.Letter).ToArray();
                Console.WriteLine($"Step {step.Letter} is dependent on {string.Join(", ", dependencies)}");
            }

            StringBuilder stepOrder = new StringBuilder();
            while (true)
            {
                var executableSteps = steps.OrderBy(s => s.Letter).Where(s => s.CanBeExecuted);
                foreach (var executableStep in executableSteps)
                {
                    stepOrder.Append(executableStep.Letter);
                    RemoveStepFromDependencies(steps, executableStep);
                    steps.Remove(executableStep);
                }

                if (!steps.Any())
                {
                    break;
                }
            }

            Console.WriteLine($"The answer is {stepOrder}");
        }

        private static void RemoveStepFromDependencies(List<Step> steps, Step dependentStep)
        {
            foreach (var step in steps)
            {
                step.RemoveDependency(dependentStep);
            }
        }

        private static List<Step> ImportSteps(string[] input)
        {
            var steps = new List<Step>();
            foreach (var stepLine in input)
            {
                // stepLine: Step V must be finished before step B can begin.
                var stepWords = stepLine.Split(' ');
                var stepLetter = stepWords[1];
                var dependentStepLetter = stepWords[7];

                var dependentStep = steps.FirstOrDefault(s => s.Letter == dependentStepLetter);
                if (dependentStep == null)
                {
                    dependentStep = new Step(dependentStepLetter);
                    steps.Add(dependentStep);
                }

                var step = steps.FirstOrDefault(s => s.Letter == stepLetter);
                if (step == null)
                {
                    step = new Step(stepLetter);
                }

                step.AddDistinctDependency(dependentStep);
            }

            return steps;
        }
    }

    class Step
    {
        public string Letter { get; }
        public List<Step> Dependencies { get; }

        public bool CanBeExecuted => !Dependencies.Any();

        public void AddDistinctDependency(Step dependentStep)
        {
            if (!Dependencies.Contains(dependentStep))
            {
                Dependencies.Add(dependentStep);
            }
        }

        public void RemoveDependency(Step dependentStep)
        {
            Dependencies.Remove(dependentStep);
        }

        public Step(string letter)
        {
            Letter = letter;
            Dependencies = new List<Step>();
        }
    }
}
