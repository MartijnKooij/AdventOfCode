using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllLines("input");

            // var root = "COM)FV9";
            var root = new Node("COM");
            var parentNode = new Node("FV9");
            root.Add(parentNode);

            //T8F)YOU
            const string source = "T8F";
            //QK6)SAN
            const string target = "QK6";

            TraverseNodes(input, parentNode);

            Console.WriteLine(parentNode.Sum(0));
        }

        private static void TraverseNodes(string[] input, Node parentNode)
        {
            foreach (var nodeId in input)
            {
                var nodeValues = nodeId.Split(")");
                var parentId = nodeValues[0];
                var childId = nodeValues[1];

                if (parentId != parentNode.Id)
                {
                    continue;
                }

                var childNode = new Node(childId);
                parentNode.Add(childNode);

                TraverseNodes(input, childNode);
            }
        }

        private class Node : IEnumerable<Node>
        {
            private readonly Dictionary<string, Node> children =
                                                new Dictionary<string, Node>();

            public readonly string Id;
            public Node Parent { get; private set; }

            public Node(string id)
            {
                Id = id;
            }

            public Node GetChild(string id)
            {
                return children[id];
            }

            public void Add(Node item)
            {
                if (item.Parent != null)
                {
                    item.Parent.children.Remove(item.Id);
                }

                item.Parent = this;
                children.Add(item.Id, item);
            }

            public int Sum(int stepsToRoot)
            {
                var stepsToHere = stepsToRoot + 1;
                var childSteps = 0;

                foreach (var child in children)
                {
                    childSteps += child.Value.Sum(stepsToHere);
                }

                return stepsToHere + childSteps;
            }

            public IEnumerator<Node> GetEnumerator()
            {
                return children.Values.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return this.GetEnumerator();
            }

            public int Count
            {
                get { return children.Count; }
            }
        }

    }
}
