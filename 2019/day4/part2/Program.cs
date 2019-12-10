using System;
using System.Collections.Generic;

namespace part2
{
    class Program
    {
        static void Main(string[] args)
        {
            const int inputStart = 158126;
            const int inputEnd = 624574;

            // Console.WriteLine(isValidPassword(112222));

            var possiblePasswords = 0;
            for (int password = inputStart; password < inputEnd; password++)
            {
                if (isValidPassword(password))
                {
                    possiblePasswords += 1;
                }
            }

            Console.WriteLine(possiblePasswords);
        }

        private static bool isValidPassword(int password)
        {
            var passwordSpan = password.ToString().AsSpan();
            var increaseOnly = true;
            var sets = new Dictionary<string,int>{
                {"0", 0},
                {"1", 0},
                {"2", 0},
                {"3", 0},
                {"4", 0},
                {"5", 0},
                {"6", 0},
                {"7", 0},
                {"8", 0},
                {"9", 0},
            };
            for (int i = 1; i < 6; i++)
            {
                if (passwordSpan[i - 1] > passwordSpan[i])
                {
                    increaseOnly = false;
                    break;
                }
                if (passwordSpan[i - 1] == passwordSpan[i])
                {
                    sets[passwordSpan[i].ToString()] += 1;
                }
            }

            var setsOfTwo = 0;
            for (int i = 0; i < 10; i++)
            {
                if (sets[i.ToString()] == 1)
                {
                    setsOfTwo += 1;
                }
            }

            if (increaseOnly && setsOfTwo > 0)
            {
                return true;
            }

            return false;
        }
    }
}
