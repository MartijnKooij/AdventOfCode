using System.IO;
using System.Linq;
using Xunit;

namespace part1
{
    public class Day19Tests
    {
        private readonly Day19 challenge;

        public Day19Tests()
        {
            challenge = new Day19();
        }

        [Fact]
        public void ParsesSingleInput()
        {
            var testData = challenge.ParseTestData(new[] {
                "Before: [0, 3, 3, 0]", "5 0 2 1", "After:  [0, 0, 3, 0]"});

            Assert.Single(testData);
            Assert.Equal(new[] { 0, 3, 3, 0 }, testData[0].Input);
            Assert.Equal(new[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new[] { 0, 0, 3, 0 }, testData[0].Output);
        }

        [Fact]
        public void ParsesMultipleInputs()
        {
            var testData = challenge.ParseTestData(new[] {
                "Before: [0, 3, 3, 0]", "5 0 2 1", "After:  [0, 0, 3, 0]",
                "",
                "Before: [2, 2, 1, 0]", "3 0 2 3", "After:  [2, 2, 1, 4]"
                });

            Assert.Equal(2, testData.Count);
            Assert.Equal(new[] { 0, 3, 3, 0 }, testData[0].Input);
            Assert.Equal(new[] { 5, 0, 2, 1 }, testData[0].Instructions);
            Assert.Equal(new[] { 0, 0, 3, 0 }, testData[0].Output);
            Assert.Equal(new[] { 2, 2, 1, 0 }, testData[1].Input);
            Assert.Equal(new[] { 3, 0, 2, 3 }, testData[1].Instructions);
            Assert.Equal(new[] { 2, 2, 1, 4 }, testData[1].Output);
        }

        [Fact]
        public void ParseShouldStopAfterDoubleNewLine()
        {
            var testData = challenge.ParseTestData(new[] {
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
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 7, 4 };

            var actualOutput = challenge.AddRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void AddImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 6, 4 };

            var actualOutput = challenge.AddImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void MultiplyRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 12, 4 };

            var actualOutput = challenge.MultiplyRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void MultiplyImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 9, 4 };

            var actualOutput = challenge.MultiplyImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseAndRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.BitwiseAndRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseAndImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 3, 4 };

            var actualOutput = challenge.BitwiseAndImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseOrRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 7, 4 };

            var actualOutput = challenge.BitwiseOrRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void BitwiseOrImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 3, 4 };

            var actualOutput = challenge.BitwiseOrImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void SetRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 3, 4 };

            var actualOutput = challenge.SetRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void SetImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 2, 4 };

            var actualOutput = challenge.SetImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanImmediateRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.GreaterThanImmediateRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.GreaterThanRegisterImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GreaterThanRegisterRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.GreaterThanRegisterRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void EqualImmediateRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.EqualImmediateRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void EqualRegisterImmediate()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 1, 4 };

            var actualOutput = challenge.EqualRegisterImmediate(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void EqualRegisterRegister()
        {
            var input = new[] { 1, 2, 3, 4 };
            var instructions = new[] { 0, 2, 3, 2 };
            var expectedOutput = new[] { 1, 2, 0, 4 };

            var actualOutput = challenge.EqualRegisterRegister(input, instructions);

            Assert.Equal(expectedOutput, actualOutput);
        }

        [Fact]
        public void GetPossibleOpCodesForTestData()
        {
            var testData = challenge.ParseTestData(new[]
            {
                "Before: [3, 2, 1, 1]", "9 2 1 2", "After:  [3, 2, 2, 1]",
                "",
                "Before: [1, 1, 2, 0]", "7 0 2 2", "After:  [1, 1, 2, 0]",
                "",
                "Before: [0, 3, 1, 1]", "10 1 3 2", "After:  [0, 3, 9, 1]"
            });

            var possibleOpCodes = challenge.GetPossibleOpCodes(testData);

            Assert.Equal(3, possibleOpCodes.Count);
            Assert.Equal(1, possibleOpCodes.Count(x => x.Value >= 3));
        }

        [Fact]
        public void GetPossibleOpCodesForTestData_Part1()
        {
            var lines = File.ReadAllLines("input.txt");
            var testData = challenge.ParseTestData(lines);

            var possibleOpCodes = challenge.GetPossibleOpCodes(testData);

            Assert.Equal(824, possibleOpCodes.Count);
            Assert.Equal(500, possibleOpCodes.Count(x => x.Value >= 3));
        }

        [Fact]
        public void GetLikelyOpCodesForTestData()
        {
            var lines = File.ReadAllLines("input.txt");
            var testData = challenge.ParseTestData(lines);

            var likelyOpCodes = challenge.GetLikelyOpCodes(testData);

            Assert.Equal(100, likelyOpCodes.Count);
        }

        [Fact]
        public void ParseTestInput()
        {
            var lines = File.ReadAllLines("input.txt");
            var testInput = challenge.ParseTestInput(lines);

            Assert.Equal(876, testInput.Count);
        }

        [Fact]
        public void ExecuteProgram()
        {
            var lines = File.ReadAllLines("input.txt");
            var instructions = challenge.ParseTestInput(lines);
            var expectedRegister = new[] { 533, 533, 3, 3 };

            var actualRegister = challenge.ExecuteProgram(instructions);

            Assert.Equal(expectedRegister, actualRegister);
        }

        [Fact]
        public void ParseDay19Input()
        {
            var lines = File.ReadAllLines("day19testinput.txt");
            var (registers, instructionPointer) = challenge.ParseDay19TestInput(lines);

            Assert.Equal(0, instructionPointer);
            Assert.Equal(7, registers.Count);
        }

        [Fact]
        public void ExecuteDay19TestProgram()
        {
            var lines = File.ReadAllLines("day19testinput.txt");
            var (instructions, instructionPointer) = challenge.ParseDay19TestInput(lines);
            var expectedRegister = new[] { 6, 5, 6, 0, 0, 9 };

            var actualRegister = challenge.ExecuteDay19Program(instructions, instructionPointer);

            Assert.Equal(expectedRegister, actualRegister);
        }

        [Fact]
        public void ExecuteDay19Program()
        {
            var lines = File.ReadAllLines("day19input.txt");
            var (instructions, instructionPointer) = challenge.ParseDay19TestInput(lines);
            var expectedRegister = new[] { 1968, 1, 979, 256, 978, 979 };

            var actualRegister = challenge.ExecuteDay19Program(instructions, instructionPointer);

            Assert.Equal(expectedRegister, actualRegister);
        }
    }
}
