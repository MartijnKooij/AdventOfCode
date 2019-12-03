using System;
using System.IO;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input");
            var totalFuel = 0;
            foreach (var line in input)
            {
                var mass = double.Parse(line);
                var moduleFuel = (int) Math.Floor(mass/3)  -2;
                
                totalFuel += moduleFuel;
            }

            Console.WriteLine(totalFuel);
        }
    }
}
