using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    public static class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input.txt");
            var stars =  new List<(int x, int y, int z, int t)>();
            foreach (var line in input)
            {
                var values = line.Split(',').Select(int.Parse).ToList();
                stars.Add((values[0], values[1], values[2], values[3]));
            }
        }
    }
}
