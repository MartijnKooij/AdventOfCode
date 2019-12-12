using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace part2
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

            var sourceNode = root.GetChild(source);
            var targetNode = root.GetChild(target);

            var orbits = 0;
            var searchNode = sourceNode.Parent;
            while (true)
            {
                orbits += 1;
                if (searchNode.HasChild(target))
                {
                    orbits += targetNode.StepsToParentNode(searchNode.Id, 0);
                    break;
                }

                searchNode = searchNode.Parent;
            }

            Console.WriteLine(orbits);
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

        private class Node
        {
            private readonly Hashtable children = new Hashtable();

            public readonly string Id;
            public Node Parent { get; private set; }

            public Node(string id)
            {
                Id = id;
            }

            public Node GetChild(string id)
            {
                if (children[id] != null)
                {
                    return children[id] as Node;
                }

                foreach (DictionaryEntry child in children)
                {
                    var childNode = child.Value as Node;
                    var node = childNode.GetChild(id);

                    if (node != null)
                    {
                        return node;
                    }
                }

                return null;
            }

            public bool HasChild(string id)
            {
                if (children[id] != null)
                {
                    return true;
                }

                foreach (DictionaryEntry child in children)
                {
                    var childNode = child.Value as Node;
                    var hasChild = childNode.HasChild(id);

                    if (hasChild)
                    {
                        return true;
                    }
                }

                return false;
            }

            public int StepsToParentNode(string parentId, int stepsToHere)
            {
                if (Parent == null)
                {
                    throw new KeyNotFoundException($"No parent found with ID {parentId}");
                }

                stepsToHere += 1;
                if (Parent.Id == parentId)
                {
                    return stepsToHere;
                }

                return Parent.StepsToParentNode(parentId, stepsToHere);
            }

            public void Add(Node item)
            {
                item.Parent = this;
                children.Add(item.Id, item);
            }

            public int Sum(int stepsToRoot)
            {
                var stepsToHere = stepsToRoot + 1;
                var childSteps = 0;

                foreach (DictionaryEntry child in children)
                {
                    var childNode = child.Value as Node;
                    childSteps += childNode.Sum(stepsToHere);
                }

                return stepsToHere + childSteps;
            }

            public int Count
            {
                get { return children.Count; }
            }
        }

    }
}
