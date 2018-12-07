using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;

namespace part2
{
    class Program
    {
        static void Main()
        {
            var input = File.ReadAllLines("input.txt");
            var steps = ImportSteps(input);

            LogStepDependencies(steps);

            var totalTime = 0;
            var workers = new List<Worker> {new Worker(), new Worker(), new Worker(), new Worker(), new Worker()};
            while (true)
            {
                var executableSteps = steps.OrderBy(s => s.Letter).Where(s => s.CanBeExecuted);

                foreach (var executableStep in executableSteps)
                {
                    if (workers.Any(x => x.ActiveStep?.Letter == executableStep.Letter))
                    {
                        continue;
                    }

                    var worker = workers.FirstOrDefault(x => x.IsFree);
                    if (worker == null)
                    {
                        continue;
                    }

                    worker.AssignWork(executableStep);
                    Console.WriteLine($"Assigned worker to step {executableStep.Letter} resulting in {worker.WorkTimeLeft} work left at time {totalTime}");
                }

                Console.WriteLine($"{workers.Count(x => !x.IsFree)} workers are busy");

                foreach (var worker in workers.Where(x => !x.IsFree))
                {
                    Console.WriteLine($"Worker is busy on step {worker.ActiveStep.Letter} with {worker.WorkTimeLeft} time left at time {totalTime}");
                    worker.Work();
                    if (worker.IsFree)
                    {
                        RemoveStepFromDependencies(steps, worker.ActiveStep);
                        steps.Remove(worker.ActiveStep);
                        worker.Done();
                    }
                }

                totalTime++;

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

    class Worker
    {
        public int WorkTimeLeft { get; private set; }
        public Step ActiveStep { get; private set; }
        public bool IsFree => WorkTimeLeft <= 0;

        public void Done()
        {
            ActiveStep = null;
            WorkTimeLeft = 0;
        }

        public void AssignWork(Step step)
        {
            ActiveStep = step;
            WorkTimeLeft = ActiveStep.Letter[0] - 64 + 60;
        }

        internal void Work()
        {
            WorkTimeLeft--;
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
