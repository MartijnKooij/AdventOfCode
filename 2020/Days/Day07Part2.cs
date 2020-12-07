using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Days.Base;

namespace Days
{
	public class Day07Part2: BaseDay
	{
		private class Bag
		{
			public List<Bag> Bags;
			public Bag ParentBag;
			public string Label;
			public int Count;

			public Bag(Bag parent, string label, int count)
			{
				ParentBag = parent;
				Label = label;
				Count = count;
				Bags = new List<Bag>();
			}
		}

		protected override void PrepareImpl()
		{
			var lines = File.ReadAllLines(InputsPath + "day07-part1.txt");
			foreach (var line in lines)
			{
				var cleanLine = line.Replace("bags", "").Replace("bag", "").Replace(".", "");

				var parentAndChildrenLabel = cleanLine.Split(new[] {"contain"}, StringSplitOptions.RemoveEmptyEntries);

                var parentBagLabel = parentAndChildrenLabel[0].Trim();
				if (parentBagLabel == "dark coral")
				{
					parentBagLabel += "";
				}

				var parentBag = root.Bags.FirstOrDefault(b => b.Label == parentBagLabel);
				if (parentBag == null)
				{
					parentBag = new Bag(null, parentBagLabel, 1);
					root.Bags.Add(parentBag);
				}

				var childLabels = parentAndChildrenLabel[1].Split(',');

				foreach (var childLabel in childLabels)
				{
					int.TryParse(Regex.Match(childLabel, @"\d+").Value, out int bagCount);
					var cleanChildLabel = Regex.Replace(childLabel, @"\d", "").Trim();

					if (cleanChildLabel == "no other")
					{
						parentBag.Bags.Clear();
						break;
					}

					var childBag = new Bag(parentBag, cleanChildLabel, bagCount);
					parentBag.Bags.Add(childBag);
				}
			}
		}

		private int CountBags(string bagLabel)
		{
			var bag = root.Bags.FirstOrDefault(b => b.Label == bagLabel);
			var count = 0;
			foreach (var child in bag.Bags)
			{
				var childCount = CountBags(child.Label);
				Log($"{child.Count} child bags {child.Label} have {childCount} children.");
				count += child.Count + (child.Count * childCount);
			}

			return count;
		}

		protected override void SolveImpl()
		{
			answer = CountBags("shiny gold");
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + answer);
		}

		private int answer ;
		private Bag root = new Bag(null, "root", 1);
	}
}
