using System.Collections.Generic;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day11Part2 : BaseDay
    {
        protected override void PrepareImpl()
        {
            var rows = File.ReadAllLines(InputsPath + "day11-part1.txt");
            InitializeRoom(rows);
        }

        private void InitializeRoom(string[] rows)
        {
            maxX = rows[0].Length;
            maxY = rows.Length;

            waitingRoom = new List<List<char>>();
            for (int x = 0; x < maxX; x++)
            {
                waitingRoom.Add(new List<char>());
                for (int y = 0; y < maxY; y++)
                {
                    waitingRoom[x].Add(rows[y][x] == 'L' ? '#' : rows[y][x]);
                }
            }
        }

        protected override void SolveImpl()
        {
            Log("-------------------");
            Log(waitingRoom);
            Log("-------------------");

            var moveCount = MovePeople();
            while (moveCount > 0)
            {
                Log("-------------------");
                Log(waitingRoom);
                Log("-------------------");

                moveCount = MovePeople();
            }

            answer = waitingRoom.Sum(r => r.Count(s => s == '#'));
        }

        private int MovePeople()
        {
            var lastWaitingRoom = CopyWaitingRoom();
            var moveCount = 0;

            for (int x = 0; x < maxX; x++)
            {
                for (int y = 0; y < maxY; y++)
                {
                    if (waitingRoom[x][y] == '.')
                    {
                        continue;
                    }

                    var occupiedSeats = CountOccupiedAdjacentSeats(lastWaitingRoom, x, y);
                    if (waitingRoom[x][y] == 'L')
                    {
                        if (occupiedSeats == 0)
                        {
                            waitingRoom[x][y] = '#';
                            moveCount++;
                        }
                    }
                    else
                    {
                        if (occupiedSeats >= 5)
                        {
                            waitingRoom[x][y] = 'L';
                            moveCount++;
                        }
                    }
                }
            }

            return moveCount;
        }

        private int CountOccupiedAdjacentSeats(List<List<char>> lastWaitingRoom, int x, int y)
        {
            var occupiedSeats = 0;

            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, -1, 0) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, 1, 0) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, 0, 1) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, 0, -1) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, -1, -1) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, 1, 1) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, 1, -1) ? 1 : 0;
            occupiedSeats += IsOccupied(lastWaitingRoom, x, y, -1, 1) ? 1 : 0;

            return occupiedSeats;
        }

        private bool IsOccupied(List<List<char>> lastWaitingRoom, int startX, int startY, int velX, int velY)
        {
            while (true)
            {
                startX += velX;
                startY += velY;
                if (startX < 0 || startX >= maxX || startY < 0 || startY >= maxY)
                {
                    return false;
                }

                if (lastWaitingRoom[startX][startY] == 'L')
                {
                    return false;
                }

                if (lastWaitingRoom[startX][startY] == '#')
                {
                    return true;
                }
            }
        }

        private List<List<char>> CopyWaitingRoom()
        {
            var copy = new List<List<char>>();
            foreach (var item in waitingRoom)
            {
                copy.Add(item.GetRange(0, item.Count));
            }

            return copy;
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private List<List<char>> waitingRoom;
        private int maxX;
        private int maxY;
    }
}
