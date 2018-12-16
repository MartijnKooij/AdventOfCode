using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Xunit;

namespace part1
{
    public class Day16Tests
    {
        private Day16 challenge;

        public Day16Tests()
        {
            challenge = new Day16();
        }

        [Fact]
        public void ParsesSingleInput()
        {
            var testData = challenge.ParseInput(new[] {
                "Before: [0, 3, 3, 0]", "5 0 2 1", "After:  [0, 0, 3, 0]"});

            Assert.Single(testData);
            Assert.Equal(new int[] { 0, 3, 3, 0 }, testData[0].Inputs);
            Assert.Equal(new int[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new int[] { 0, 0, 3, 0 }, testData[0].Outputs);
        }

        [Fact]
        public void ParsesMultipleInputs()
        {
            var testData = challenge.ParseInput(new[] {
                "Before: [0, 3, 3, 0]", "5 0 2 1", "After:  [0, 0, 3, 0]",
                "",
                "Before: [2, 2, 1, 0]", "3 0 2 3", "After:  [2, 2, 1, 4]"
                });

            Assert.Equal(2, testData.Count);
            Assert.Equal(new int[] { 0, 3, 3, 0 }, testData[0].Inputs);
            Assert.Equal(new int[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new int[] { 0, 0, 3, 0 }, testData[0].Outputs);
            Assert.Equal(new int[] { 2, 2, 1, 0 }, testData[1].Inputs);
            Assert.Equal(new int[] { 3, 0, 2, 3 }, testData[1].Instructions);
            Assert.Equal(new int[] { 2, 2, 1, 4 }, testData[1].Outputs);
        }

        [Fact]
        public void ParseShouldStopAfterDoubleNewLine()
        {
            var testData = challenge.ParseInput(new[] {
                "Before: [0, 3, 3, 0]", "5 0 2 1", "After:  [0, 0, 3, 0]",
                "",
                "Before: [2, 2, 1, 0]", "3 0 2 3", "After:  [2, 2, 1, 4]",
                "",
                "",
                "Before: [2, 2, 1, 0]", "3 0 2 3", "After:  [2, 2, 1, 4]"
                });

            Assert.Equal(2, testData.Count);
        }
    }

    public class Day16
    {
        public List<TestData> ParseInput(string[] lines)
        {
            var testData = new List<TestData>{
                new TestData()
            };
            var lineType = -1;
            var testDataIndex = 0;

            foreach (var line in lines.Select(x => x.Replace("  ", " ").Trim()))
            {
                lineType++;

                if (lineType == 0 && string.IsNullOrEmpty(line))
                {
                    testData.RemoveAt(testDataIndex - 1);
                    break;
                }

                switch (lineType)
                {
                    case 0:
                        testData[testDataIndex].Inputs = line
                            .Replace("Before: [", "")
                            .Replace("]", "")
                            .Split(",")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 1:
                        testData[testDataIndex].Instructions = line
                            .Split(" ")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 2:
                        testData[testDataIndex].Outputs = line
                            .Replace("After: [", "")
                            .Replace("]", "")
                            .Split(",")
                            .Select(x => int.Parse(x.Trim()))
                            .ToArray();
                        break;
                    case 3:
                        testData.Add(new TestData());
                        testDataIndex++;
                        lineType = -1;
                        break;
                }
            }

            return testData;
        }
    }

    public class TestData
    {
        public int[] Inputs { get; set; }

        public int[] Instructions { get; set; }

        public int[] Outputs { get; set; }

    }
}
