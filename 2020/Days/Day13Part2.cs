using System.Collections.Generic;
using System.IO;
using Days.Base;
using System.Linq;
using System;

namespace Days
{
    public class Day13Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            var lines = File.ReadAllLines(InputsPath + "day13-part1.txt");
            var values = lines[1].Split(',');
			offsets = new List<int>();
			for (int i = 0; i < values.Length; i++)
			{
				if (values[i] != "x")
				{
					offsets.Add(i);
				}
			}
			
			timestamps = values.Where(c => c != "x").Select(int.Parse).ToList();
        }

        protected override void SolveImpl()
        {
            answer = findMinX(timestamps.ToArray(), offsets.ToArray(), timestamps.Count);
        }

        private static long findMinX(int[] num, int[] rem, int k)
        {
            // Initialize result 
            long x = 1;

            // As per the Chinese remainder theorem, 
            // this loop will always break. 
            while (true)
            {
                // Check if remainder of x % num[j] is  
                // rem[j] or not (for all j from 0 to k-1) 
				var j = 0;
                for (j = 0; j < k; j++)
                {
                    var remj = x % num[j];
					remj = remj == 0 ? 0 : num[j] - remj;
                    if (remj != rem[j])
                        break;
                }

                // If all remainders matched, we found x 
                if (j == k)
                    return x;

                // Else try next numner 
                x++;
            }
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private long answer;
        private IList<int> timestamps;
		private IList<int> offsets;
    }
}
