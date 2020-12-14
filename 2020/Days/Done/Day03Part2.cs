using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Numerics;
using Days.Base;

namespace Days
{
    public class Day03Part2 : BaseDay
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
            var trees1 = CountTrees(1, 1);
            var trees2 = CountTrees(3, 1);
            var trees3 = CountTrees(5, 1);
            var trees4 = CountTrees(7, 1);
            var trees5 = CountTrees(1, 2);

            _answer = trees1 * trees2 * trees3 * trees4 * trees5;
        }

        private ulong CountTrees(int stepX, int stepY)
        {
            var x = 0;
            var y = 0;
            ulong trees = 0;

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
                    trees++;
                }
            }

            return trees;
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + _answer);
        }

        private ulong _answer;
        private List<List<char>> _map;
        private int maxX;
        private int maxY;
    }
}
