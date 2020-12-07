using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Days.Base;

namespace Days
{
	public class Day07Part1: BaseDay
	{
		private class Bag
		{
			public List<Bag> Bags;
			public Bag ParentBag;
			public string Label;

			public Bag(Bag parent, string label)
			{
				ParentBag = parent;
				Label = label;
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
                var parentBag = FindBag(root, parentBagLabel);
				if (parentBag == null)
				{
					parentBag = new Bag(null, parentBagLabel);
					root.Bags.Add(parentBag);
				}

				var childLabels = parentAndChildrenLabel[1].Split(',');

				foreach (var childLabel in childLabels)
				{
					var cleanChildLabel = Regex.Replace(childLabel, @"\d", "").Trim();

					if (cleanChildLabel == "no other")
					{
						parentBag.Bags.Clear();
						break;
					}

					var childBag = FindBag(root, cleanChildLabel);
					if (childBag == null)
					{
						childBag = new Bag(parentBag, cleanChildLabel);
						root.Bags.Add(childBag);
					}
					parentBag.Bags.Add(childBag);
				}
			}
		}

		private Bag FindBag(Bag parent, string label)
		{
			if (parent.Label == label)
			{
				return parent;
			}

			foreach (var bag in parent.Bags)
			{
				var found = FindBag(bag, label);
				if (found != null)
				{
					return found;
				}
			}

			return null;
		}

		protected override void SolveImpl()
		{
			const string myBagLabel = "shiny gold";
			var foundBags = new List<Bag>();

			foreach (var bag in root.Bags)
			{
				var foundBag = FindBag(bag, myBagLabel);
				if (foundBag != null && bag.Label != myBagLabel)
				{
					foundBags.Add(bag);
				}
			}

			answer = foundBags.Select(b => b.Label).Distinct().Count();
		}

		protected override void RenderImpl()
		{
			Log("Answer: " + answer);
		}

		private int answer ;
		private Bag root = new Bag(null, "root");
	}
}
