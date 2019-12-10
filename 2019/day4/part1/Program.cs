using System;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            const int inputStart = 158126;
            const int inputEnd = 624574;

            var possiblePasswords = 0;
            for (int password = inputStart; password < inputEnd; password++)
            {
                var passwordSpan = password.ToString().AsSpan();
                var constainsSet = false;
                var increaseOnly = true;
                for (int i = 1; i < 6; i++)
                {
                    if (passwordSpan[i - 1] > passwordSpan[i])
                    {
                        increaseOnly = false;
                        break;
                    }
                    if (passwordSpan[i - 1] == passwordSpan[i])
                    {
                        constainsSet = true;
                    }
                }

                if (increaseOnly && constainsSet)
                {
                    possiblePasswords += 1;
                }
            }

            Console.WriteLine(possiblePasswords);
        }
    }
}
