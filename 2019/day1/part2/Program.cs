using System;
using System.IO;

namespace day2
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input");
            var totalFuel = 0;
            foreach (var line in input)
            {
                int moduleFuel = GetFuelNeeded(double.Parse(line));

                totalFuel += moduleFuel;
            }

            Console.WriteLine(totalFuel);
        }

        private static int GetFuelNeeded(double mass)
        {
            var moduleFuel = (int)Math.Floor(mass / 3) - 2;

            if (moduleFuel < 0)
            {
                moduleFuel = 0;
            }

            if (moduleFuel > 0)
            {
                moduleFuel += GetFuelNeeded(moduleFuel);
            }

            return moduleFuel;
        }
    }
}
