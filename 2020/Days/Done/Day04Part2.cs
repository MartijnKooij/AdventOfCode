using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using Days.Base;

namespace Days
{
    public class Day04Part2 : BaseDay
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
                fields[fieldName].Value = value ?? "";
            }

            public bool IsValid()
            {
                return fields.Values.All(f => f.IsValid());
            }

            public Passport(string passportValues)
            {
                fields.Add("byr", new PassportField("byr", (string value) => {
                    int.TryParse(value, out int year);
                    return !string.IsNullOrWhiteSpace(value) && year >= 1920 && year <= 2002;
                }));
                fields.Add("iyr", new PassportField("iyr", (string value) => {
                    int.TryParse(value, out int year);
                    return !string.IsNullOrWhiteSpace(value) && year >= 2010 && year <= 2020;
                }));
                fields.Add("eyr", new PassportField("eyr", (string value) => {
                    int.TryParse(value, out int year);
                    return !string.IsNullOrWhiteSpace(value) && year >= 2020 && year <= 2030;
                }));
                fields.Add("hgt", new PassportField("hgt", (string value) => {
                    int min = 0;
                    int max = 0;
                    if (value.EndsWith("cm"))
                    {
                        min = 150;
                        max = 193;
                    }
                    if (value.EndsWith("in"))
                    {
                        min = 59;
                        max = 76;
                    }
                    value = value.Replace("cm", "");
                    value = value.Replace("in", "");

                    int.TryParse(value, out int height);
                    return !string.IsNullOrWhiteSpace(value) && height >= min && height <= max;
                }));
                fields.Add("hcl", new PassportField("hcl", (string value) => {
                    var regEx = new Regex("^#(?:[0-9a-fA-F]{3}){1,2}$");
                    return !string.IsNullOrWhiteSpace(value) && regEx.IsMatch(value);
                }));
                fields.Add("ecl", new PassportField("ecl", (string value) => {
                    return !string.IsNullOrWhiteSpace(value) && (new[] {"amb", "blu", "brn", "gry", "grn", "hzl", "oth"}).Contains(value);
                }));
                fields.Add("pid", new PassportField("pid", (string value) => {
                    int.TryParse(value, out int id);
                    return !string.IsNullOrWhiteSpace(value) && id > 0 && value.Length == 9;
                }));
                fields.Add("cid", new PassportField("cid", (string value) => {
                    return true;
                }));

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
            public string Value = "";
            private string key;

            private Func<string, bool> validate;

            public bool IsValid()
            {
                var isValid = validate(Value);

                if (!isValid)
                {
                    Log($"{key} is not value with value {Value}");
                }

                return isValid;
            }

            public PassportField(string key, Func<string, bool> validate)
            {
                this.key = key;
                this.validate = validate;
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
