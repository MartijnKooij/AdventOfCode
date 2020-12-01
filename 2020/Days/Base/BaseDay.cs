using System;

namespace Days.Base
{
	public abstract class BaseDay
	{
		protected const string InputsPath = "../Inputs/";

		public void Prepare()
		{
			Log("Prepare Start...");

			PrepareImpl();

			Log("Prepare End...");
		}

		public void Solve()
		{
			Log("Solve Start...");

			SolveImpl();

			Log("Solve End...");
		}

		public void Render()
		{
			Log("Render Start...");

			RenderImpl();

			Log("Render End...");
		}

		protected abstract void PrepareImpl();
		protected abstract void SolveImpl();
		protected abstract void RenderImpl();

		protected static void Log(string message)
		{
			var milliseconds = DateTime.Now.Ticks / TimeSpan.TicksPerMillisecond;

			Console.WriteLine(milliseconds + ": " + message);
		}
	}
}
