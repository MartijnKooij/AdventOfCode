using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main()
        {
            var input = File.ReadAllText("input.txt");
            var tree = ParseTree(input);

            var totalMeta = tree.GetTotalMetaEntryValue();

            Console.WriteLine($"The answer is {totalMeta}");
        }

        private static Node ParseTree(string input)
        {
            var values = input.Split(' ').Select(int.Parse).ToArray();

            var currentIndex = 0;
            var root = new Node(values[currentIndex], values[++currentIndex]);
            currentIndex++;
            root.ParseInput(values, ref currentIndex);

            return root;
        }
    }

    public class Node
    {
        public Header Header { get; }

        public List<Node> Children { get; set; }

        public List<int> MetaEntries { get; set; }   

        public void ParseInput(int[] values, ref int currentIndex)
        {
            for (var childIndex = 0; childIndex < Header.ChildNodeCount; childIndex++)
            {
                var child = new Node(values[currentIndex], values[++currentIndex]);
                currentIndex++;
                child.ParseInput(values, ref currentIndex);

                Children.Add(child);
            }

            for (var meta = 0; meta < Header.MetaEntryCount; meta++)
            {
                MetaEntries.Add(values[currentIndex++]);
            }
        }

        public int GetTotalMetaEntryValue()
        {
            var totalMeta = MetaEntries.Sum();
            foreach (var child in Children)
            {
                totalMeta += child.GetTotalMetaEntryValue();
            }

            return totalMeta;
        }

        public Node(int childNodeCount, int metaEntryCount)
        {
            Header = new Header {
                ChildNodeCount = childNodeCount,
                MetaEntryCount = metaEntryCount
            };

            Children = new List<Node>(childNodeCount);
            MetaEntries = new List<int>(metaEntryCount);
        }
    }

    public class Header
    {
        public int ChildNodeCount { get; set; }
        public int MetaEntryCount { get; set; }
    }
}
