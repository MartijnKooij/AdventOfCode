using System;
using System.Collections.Generic;
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

            Assert.Equal(3, testData.Count);
        }
    }

    public class Day16
    {
        public List<TestData> ParseInput(string[] lines)
        {
            var testData = new List<TestData>();

            return testData;
        }
    }

    public class TestData
    {
        public int[] Inputs { get; set; }

        public int[] Instruction { get; set; }

        public int[] Outputs { get; set; }

    }
}
