﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var recipes = new List<int> { 3, 7 };
            var totalRecipes = "37";
            var elf1Index = 0;
            var elf2Index = 1;

            while (true)
            {
                var elf1Recipe = recipes[elf1Index];
                var elf2Recipe = recipes[elf2Index];

                var sum = elf1Recipe + elf2Recipe;
                var digits = GetDigits(sum);

                totalRecipes += sum.ToString();
                recipes.AddRange(digits);

                elf1Index = (elf1Index + recipes[elf1Index] + 1) % recipes.Count;
                elf2Index = (elf2Index + recipes[elf2Index] + 1) % recipes.Count;

                //Console.WriteLine(string.Join(" ", recipes));

                if (totalRecipes.Contains("825401")) {
                    Console.WriteLine($"The answer is {totalRecipes} {totalRecipes.IndexOf("825401")}");
                    break;
                }
            }
        }

        public static List<int> GetDigits(int value)
        {
            var values = new List<int>();
            if (value >= 10)
            {
                values.AddRange(GetDigits(value / 10));
            }
            values.Add(value % 10);

            return values;
        }
    }
}
