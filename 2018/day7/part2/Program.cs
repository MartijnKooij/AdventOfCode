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

            LogStepDependencies(steps);

            var totalTime = 0;
            while (true)
            {
                var executableSteps = steps.OrderBy(s => s.Letter).Where(s => s.CanBeExecuted);
                foreach (var executableStep in executableSteps)
                {
                    RemoveStepFromDependencies(steps, executableStep);
                    steps.Remove(executableStep);

                    totalTime += (int)executableStep.Letter[0] - 64;
                }

                if (!steps.Any())
                {
                    break;
                }
            }

            Console.WriteLine($"The answer is {totalTime}");
        }

        private static void LogStepDependencies(List<Step> steps)
        {
            Console.WriteLine(" --- LOG --- ");
            foreach (var step in steps)
            {
                var dependencies = step.Dependencies.Select(s => s.Letter).ToArray();
                Console.WriteLine($"Step {step.Letter} is dependent on {string.Join(", ", dependencies)}");
            }
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
                // stepLine: Step C must be finished before step A can begin.
                var stepWords = stepLine.Split(' ');
                var stepLetter = stepWords[7];
                var dependentStepLetter = stepWords[1];

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
                    steps.Add(step);
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
