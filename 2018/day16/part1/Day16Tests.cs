using Xunit;

namespace part1
{
    public class Day16Tests
    {
        private readonly Day16 challenge;

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
            Assert.Equal(new[] { 0, 3, 3, 0 }, testData[0].Inputs);
            Assert.Equal(new[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new[] { 0, 0, 3, 0 }, testData[0].Outputs);
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
            Assert.Equal(new[] { 0, 3, 3, 0 }, testData[0].Inputs);
            Assert.Equal(new[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new[] { 0, 0, 3, 0 }, testData[0].Outputs);
            Assert.Equal(new[] { 2, 2, 1, 0 }, testData[1].Inputs);
            Assert.Equal(new[] { 3, 0, 2, 3 }, testData[1].Instructions);
            Assert.Equal(new[] { 2, 2, 1, 4 }, testData[1].Outputs);
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

        [Fact]
        public void AddRegister()
        {
            var input = new[] {1, 2, 3, 4};
            var expectedOutput = new[] {1, 2, 3, 7};

            var actualOutput = challenge.AddRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void AddImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 6 };

            var actualOutput = challenge.AddImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void MultiplyRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 12 };

            var actualOutput = challenge.MultiplyRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void MultiplyImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 9 };
    
            var actualOutput = challenge.MultiplyImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseAndRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 0 };

            var actualOutput = challenge.BitwiseAndRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseAndImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 3 };

            var actualOutput = challenge.BitwiseAndImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseOrRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 7 };

            var actualOutput = challenge.BitwiseOrRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseOrImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 3 };

            var actualOutput = challenge.BitwiseOrImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void SetRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 3 };

            var actualOutput = challenge.SetRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void SetImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 2 };

            var actualOutput = challenge.SetImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanImmediateRegister_IsFalse()
        {
            var input = new[] { 1, 2, 3, 4 };
            var expectedOutput = new[] { 1, 2, 3, 0 };

            var actualOutput = challenge.GreaterThanImmediateRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanImmediateRegister_IsTrue()
        {
            var input = new[] { 1, 2, 3, 1 };
            var expectedOutput = new[] { 1, 2, 3, 1 };

            var actualOutput = challenge.GreaterThanImmediateRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterImmediate_IsFalse()
        {
            var input = new[] { 1, 3, 4, 1 };
            var expectedOutput = new[] { 1, 3, 4, 0 };

            var actualOutput = challenge.GreaterThanRegisterImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterImmediate_IsTrue()
        {
            var input = new[] { 1, 3, 0, 1 };
            var expectedOutput = new[] { 1, 3, 0, 1 };

            var actualOutput = challenge.GreaterThanRegisterImmediate(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterRegister_IsFalse()
        {
            var input = new[] { 1, 1, 2, 1 };
            var expectedOutput = new[] { 1, 1, 2, 0 };

            var actualOutput = challenge.GreaterThanRegisterRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterRegister_IsTrue()
        {
            var input = new[] { 1, 3, 2, 3 };
            var expectedOutput = new[] { 1, 3, 2, 1 };

            var actualOutput = challenge.GreaterThanRegisterRegister(input);

            Assert.Equal(expectedOutput, actualOutput);
        }
    }
}
