using System;
using System.Collections.Generic;
using System.Text;

namespace Days.Base
{
    public abstract class BaseDay
    {
        protected const string InputsPath = "../Inputs/";

        public void Prepare()
        {
            Log("Prepare Start...");

            PrepareImpl();

            Log("Prepare End...");
        }

        public void Solve()
        {
            Log("Solve Start...");

            SolveImpl();

            Log("Solve End...");
        }

        public void Render()
        {
            Log("Render Start...");

            RenderImpl();

            Log("Render End...");
        }

        protected abstract void PrepareImpl();
        protected abstract void SolveImpl();
        protected abstract void RenderImpl();

        protected static void Log(string message)
        {
            var milliseconds = DateTime.Now.Ticks / TimeSpan.TicksPerMillisecond;

            Console.WriteLine(milliseconds + ": " + message);
        }

        protected static void Log(List<List<char>> map)
        {
            var maxX = map.Count;
            var maxY = map[0].Count;

            for (int y = 0; y < maxY; y++)
            {
                var log = new StringBuilder();
                for (int x = 0; x < maxX; x++)
                {
                    log.Append(map[x][y]);
                }
                Console.WriteLine(log.ToString());
            }
        }

        protected static int ManhattanDistance(int x1, int x2, int y1, int y2)
        {
            return Math.Abs(x1 - x2) + Math.Abs(y1 - y2);
        }

    }
}
