using System;

namespace part1
{
    class Program
    {
        static void Main()
        {
            const int serialNumber = 5468;
            var grid = new int[300, 300];

            for (var x = 0; x < grid.GetLength(0); x++)
            {
                for (var y = 0; y < grid.GetLength(1); y++)
                {
                    var rackId = x + 1 + 10;
                    var powerLevel = rackId * (y + 1);
                    powerLevel += serialNumber;
                    powerLevel *= rackId;

                    var powerLevelString = powerLevel.ToString();
                    powerLevel = powerLevelString.Length >= 3 ? int.Parse(powerLevelString.Substring(powerLevelString.Length - 3, 1)) : 0;

                    powerLevel -= 5;

                    grid[x, y] = powerLevel;
                }
            }

            var maxPower = 0;
            var highPowerX = 0;
            var highPowerY = 0;
            var highSize = 0;

            for (int size = 1; size < 300; size++)
            {
                for (var x = 0; x < grid.GetLength(0) - size - 1; x++)
                {
                    for (var y = 0; y < grid.GetLength(1) - size - 1; y++)
                    {
                        var areaPower = 0;
                        for (var offsetX = 0; offsetX < size; offsetX++)
                        {
                            for (var offsetY = 0; offsetY < size; offsetY++)
                            {
                                areaPower += grid[x + offsetX, y + offsetY];
                            }
                        }

                        if (areaPower <= maxPower)
                        {
                            continue;
                        }

                        maxPower = areaPower;
                        highPowerX = x + 1;
                        highPowerY = y + 1;
                        highSize = size;
                    }
                }
            }

            Console.WriteLine($"The answer is location [{highPowerX},{highPowerY},{highSize}] has {maxPower} power");
        }
    }
}
