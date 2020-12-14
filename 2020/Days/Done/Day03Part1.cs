using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day03Part1 : BaseDay
    {
        protected override void PrepareImpl()
        {
            var rows = File.ReadAllLines(InputsPath + "day03-part1.txt");

            InitializeMap(rows);
            PopulateMap(rows);
        }

        private void InitializeMap(string[] rows)
        {
            maxX = rows[0].Length;
            maxY = rows.Length;

            _map = new List<List<char>>();
            for (int x = 0; x < maxX; x++)
            {
                _map.Add(new List<char>());
                for (int y = 0; y < maxY; y++)
                {
                    _map[x].Add('?');
                }
            }
        }

        private void PopulateMap(string[] rows)
        {
            var y = 0;
            foreach (var row in rows)
            {
                for (int x = 0; x < row.Length; x++)
                {
                    _map[x][y] = row[x];
                }
                y++;
            }
        }

        protected override void SolveImpl()
        {
            const int stepX = 3;
            const int stepY = 1;
            var x = 0;
            var y = 0;

            while (y < maxY - stepY)
            {
                x += stepX;
                y += stepY;

                if (x >= maxX)
                {
                    x = x - maxX;
                }

                var mapItem = _map[x][y];
                if (mapItem == '#')
                {
                    _answer ++;
                }
            }
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + _answer);
        }

        private int _answer;
        private List<List<char>> _map;
        private int maxX;
        private int maxY;
    }
}
