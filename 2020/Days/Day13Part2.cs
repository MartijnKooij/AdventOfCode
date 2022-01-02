using System.Collections.Generic;
using System.IO;
using Days.Base;
using System.Linq;
using System;
using System.Threading.Tasks;

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

        private static long findMinX(int[] values, int[] expectedRemainders, int k)
        {
            int max = values[0];
            long x = 722385461606823;

            while (true)
            {
                if (x % 3700000000 == 0)
                {
                    Log("Still running...");
                }

				var j = 0;
                if (x % values[j] != 0)
                    continue;

                for (j = 1; j < k; j++)
                {
                    if (values[j] - x % values[j] != expectedRemainders[j])
                        break;
                }

                if (j == k)
                    return x;

                x += max;
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
