using Days;

namespace Runner
{
	public static class Program
	{
		private static void Main()
		{
			var day = new Day01Part2();
			day.Prepare();
			day.Solve();
			day.Render();
		}
	}
}
