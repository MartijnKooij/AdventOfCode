using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part2
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            var logEntries = ParseInput(input);
            var guards = GenerateGuardData(logEntries);

            var highestSleepCount = 0;
            var highestSleepMinute = -1;
            var highestSleepGuardId = "";
            foreach (var guard in guards)
            {
                for (var minute = 0; minute < 60; minute++)
                {
                    if (guard.SleepCountPerMinute[minute] > highestSleepCount)
                    {
                        highestSleepCount = guard.SleepCountPerMinute[minute];
                        highestSleepMinute = minute;
                        highestSleepGuardId = guard.Id;
                    }
                }
            }

            Console.WriteLine($"Guard {highestSleepGuardId} slept {highestSleepCount} times at minute {highestSleepMinute}");
        }

        private static List<Guard> GenerateGuardData(List<LogEntry> logEntries)
        {
            var guards = new List<Guard>();
            var previousGuardId = "";
            Guard currentGuard = null;
            var startedSleepingAt = DateTime.MinValue;
            foreach (var logEntry in logEntries)
            {
                switch (logEntry.Message)
                {
                    case "falls asleep":
                        startedSleepingAt = logEntry.Date;

                        break;
                    case "wakes up":
                        var sleptFor = (logEntry.Date - startedSleepingAt).TotalMinutes;
                        for (var i = 0; i < sleptFor; i++)
                        {
                            var sleepingMinute = startedSleepingAt.AddMinutes(i).Minute;
                            if (currentGuard != null)
                            {
                                currentGuard.SleepCountPerMinute[sleepingMinute]++;
                            }
                        }

                        break;
                    default:
                        var logWords = logEntry.Message.Split(' ');
                        var guardId = logWords[1];
                        if (guardId != previousGuardId)
                        {
                            if (currentGuard != null)
                            {
                                if (guards.All(x => x.Id != currentGuard.Id))
                                {
                                    guards.Add(currentGuard);
                                }
                            }

                            currentGuard = guards.FirstOrDefault(x => x.Id == guardId) ?? new Guard(guardId);
                            previousGuardId = guardId;
                        }

                        break;
                }
            }

            return guards;
        }

        private static List<LogEntry> ParseInput(string[] input)
        {
            var logEntries = new List<LogEntry>();
            foreach (var value in input)
            {
                //[1518-11-08 00:02] Guard #2851 begins shift
                var logEntry = new LogEntry
                {
                    Date = DateTime.Parse(value.Substring(1, 16)),
                    Message = value.Substring(19)
                };
                logEntries.Add(logEntry);
            }

            return logEntries.OrderBy(x => x.Date).ToList();
        }
    }

    class Guard
    {
        public string Id { get; }

        public int[] SleepCountPerMinute { get; set; }

        public int TotalSleepTimes()
        {
            return SleepCountPerMinute.Where(x => x > 0).Sum();
        }

        public Guard(string id)
        {
            Id = id;
            SleepCountPerMinute = Enumerable.Repeat(0, 60).ToArray();
        }
    }

    class LogEntry
    {
        public DateTime Date { get; set; }
        public string Message { get; set; }
    }
}
