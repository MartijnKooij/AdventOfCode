using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using Days.Base;

namespace Days
{
    public class Day04Part1 : BaseDay
    {
        /*
            byr (Birth Year) - four digits; at least 1920 and at most 2002.
            iyr (Issue Year) - four digits; at least 2010 and at most 2020.
            eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
            hgt (Height) - a number followed by either cm or in:
                If cm, the number must be at least 150 and at most 193.
                If in, the number must be at least 59 and at most 76.
            hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            pid (Passport ID) - a nine-digit number, including leading zeroes.
            cid (Country ID) - ignored, missing or not.
        */
        private class Passport
        {
            public void AddFieldValue(string fieldName, string value)
            {
                fields[fieldName].Value = value;
            }

            public bool IsValid()
            {
                return fields.Values.All(f => f.IsValid());
            }

            public Passport(string passportValues)
            {
                fields.Add("byr", new PassportField(true));
                fields.Add("iyr", new PassportField(true));
                fields.Add("eyr", new PassportField(true));
                fields.Add("hgt", new PassportField(true));
                fields.Add("hcl", new PassportField(true));
                fields.Add("ecl", new PassportField(true));
                fields.Add("pid", new PassportField(true));
                fields.Add("cid", new PassportField(false));

                var tempFields = passportValues.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var tempField in tempFields)
                {
                    var tempFieldPair = tempField.Split(':');
                    fields[tempFieldPair[0]].Value = tempFieldPair[1];
                }
            }

            private Dictionary<string, PassportField> fields = new Dictionary<string, PassportField>();
        }

        private class PassportField
        {
            public string Value;
            public bool IsRequired;

            public bool IsValid()
            {
                return IsRequired ? !string.IsNullOrWhiteSpace(Value) : true;
            }

            public PassportField(bool isRequired)
            {
                IsRequired = isRequired;
            }
        }

        protected override void PrepareImpl()
        {
            var lines = File.ReadAllLines(InputsPath + "day04-part1.txt");

            var passportValues = "";
            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line))
                {
                    var passport = new Passport(passportValues);
                    passports.Add(passport);

                    passportValues = "";
                }

                passportValues += " " + line;
            }
            if (!string.IsNullOrWhiteSpace(passportValues))
            {
                var passport = new Passport(passportValues);
                passports.Add(passport);
            }
        }

        protected override void SolveImpl()
        {
            var invalid = passports.Where(p => !p.IsValid());
            answer = passports.Count(p => p.IsValid());
        }

        protected override void RenderImpl()
        {
            Log("Answer: " + answer);
        }

        private int answer;
        private List<Passport> passports = new List<Passport>();
    }
}
