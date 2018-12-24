using System;
using System.Collections.Generic;
using System.Linq;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Unit> units = PopulateTestUnits();

            while (units.Where(u => u.Count > 0).Select(u => u.UnitType).Distinct().Count() > 1)
            {
                LogUnits(units);

                ResetTargets(units);
                SelectTargets(units);
                AttackTargets(units);
            }

            var winningUnit = units.First(u => u.Count > 0);
            var winningArmySize = units.Sum(u => u.Count);
            Console.WriteLine($"The winning army {winningUnit.UnitType} has {winningArmySize} units left");
        }

        private static void LogUnits(List<Unit> units)
        {
            foreach (var unit in units.OrderBy(u => u.UnitType))
            {
                Console.WriteLine($"{unit.UnitType} contains {unit.Count} units and does {unit.EffectivePower} damage");
            }
            Console.WriteLine();
        }

        private static void AttackTargets(List<Unit> units)
        {
            foreach (var unit in units
                                    .Where(u => u.TargetId != Guid.Empty && u.Count > 0)
                                    .OrderByDescending(u => u.Initiative)
                    )
            {
                var enemy = units.Single(u => u.Id == unit.TargetId);
                enemy.Hit(unit.AttackType, unit.EffectivePower);

                Console.WriteLine($"{unit.UnitType} attacks {enemy.UnitType} dealing {enemy.CalculateDamage(unit.AttackType, unit.EffectivePower)} damage");
            }
        }

        private static void SelectTargets(List<Unit> units)
        {
            foreach (var unit in units.Where(u => u.Count > 0))
            {
                var enemies = units.Where(u => u.UnitType != unit.UnitType && u.TargetedById == Guid.Empty && u.Count > 0)
                                    .OrderByDescending(u => u.EffectivePower)
                                    .ThenByDescending(u => u.Initiative);

                var mostDamage = 0;
                Unit preferredEnemy = null;
                foreach (var enemy in enemies)
                {
                    var damage = enemy.CalculateDamage(unit.AttackType, unit.EffectivePower);
                    if (damage > mostDamage)
                    {
                        preferredEnemy = enemy;
                        mostDamage = damage;
                    }
                }
                if (mostDamage > 0)
                {
                    Console.WriteLine($"{unit.UnitType} with initiative {unit.Initiative} picks {preferredEnemy.UnitType} dealing {preferredEnemy.CalculateDamage(unit.AttackType, unit.EffectivePower)} damage");

                    unit.TargetId = preferredEnemy.Id;
                    preferredEnemy.TargetedById = unit.Id;
                }
            }
        }

        private static void ResetTargets(List<Unit> units)
        {
            foreach (var unit in units)
            {
                unit.TargetId = Guid.Empty;
                unit.TargetedById = Guid.Empty;
            }
        }

        private static List<Unit> PopulateUnits()
        {
            return new List<Unit>{
                new Unit(UnitType.ImmuneSystem, 8808, 5616, new[] { AttackType.Ice }, new[] { AttackType.Radiation }, 5, AttackType.Bludgeoning, 10),
                new Unit(UnitType.ImmuneSystem, 900, 13511, new AttackType[] { }, new[] { AttackType.Radiation }, 107, AttackType.Radiation, 20),
                new Unit(UnitType.ImmuneSystem, 581, 10346, new[] { AttackType.Slashing }, new[] { AttackType.Radiation }, 140, AttackType.Fire, 14),
                new Unit(UnitType.ImmuneSystem, 57, 9991, new[] { AttackType.Slashing, AttackType.Radiation, AttackType.Fire }, new[] { AttackType.Bludgeoning }, 1690, AttackType.Fire, 4),
                new Unit(UnitType.ImmuneSystem, 4074, 6549, new AttackType[] { }, new[] { AttackType.Fire }, 15, AttackType.Radiation, 2),
                new Unit(UnitType.ImmuneSystem, 929, 5404, new[] { AttackType.Bludgeoning, AttackType.Radiation }, new AttackType[] {  }, 45, AttackType.Fire, 16),
                new Unit(UnitType.ImmuneSystem, 2196, 3186, new[] { AttackType.Radiation }, new[] { AttackType.Fire }, 10, AttackType.Fire, 11),
                new Unit(UnitType.ImmuneSystem, 4420, 9691, new[] { AttackType.Fire }, new[] { AttackType.Radiation }, 21, AttackType.Fire, 7),
                new Unit(UnitType.ImmuneSystem, 3978, 2306, new AttackType[] {  }, new AttackType[] { AttackType.Ice, AttackType.Radiation }, 4, AttackType.Fire, 12),
                new Unit(UnitType.ImmuneSystem, 1284, 4487, new AttackType[] {  }, new AttackType[] { AttackType.Radiation, AttackType.Bludgeoning }, 32, AttackType.Slashing, 19),

                new Unit(UnitType.Infection, 4262, 23427, new[] { AttackType.Fire }, new[] { AttackType.Slashing }, 9, AttackType.Slashing, 8),
                new Unit(UnitType.Infection, 217, 9837, new AttackType[] {  }, new[] { AttackType.Bludgeoning }, 73, AttackType.Bludgeoning, 1),
                new Unit(UnitType.Infection, 5497, 33578, new AttackType[] {  }, new[] { AttackType.Radiation, AttackType.Ice }, 11, AttackType.Slashing, 17),
                new Unit(UnitType.Infection, 866, 41604, new AttackType[] {  }, new[] { AttackType.Ice }, 76, AttackType.Radiation, 15),
                new Unit(UnitType.Infection, 1823, 19652, new AttackType[] {  }, new[] { AttackType.Fire, AttackType.Ice }, 20, AttackType.Slashing, 13),
                new Unit(UnitType.Infection, 2044, 23512, new AttackType[] {  }, new[] { AttackType.Ice }, 22, AttackType.Slashing, 9),
                new Unit(UnitType.Infection, 373, 40861, new[] { AttackType.Ice }, new AttackType[] { }, 215, AttackType.Slashing, 18),
                new Unit(UnitType.Infection, 5427, 43538, new[] { AttackType.Radiation }, new[] { AttackType.Bludgeoning }, 15, AttackType.Slashing, 5),
                new Unit(UnitType.Infection, 3098, 19840, new AttackType[] {  }, new[] { AttackType.Bludgeoning, AttackType.Ice }, 12, AttackType.Radiation, 3),
                new Unit(UnitType.Infection, 785, 14669, new AttackType[] {  }, new AttackType[] {  }, 30, AttackType.Fire, 6),
            };
        }

        private static List<Unit> PopulateTestUnits()
        {
            return new List<Unit>{
                new Unit(UnitType.ImmuneSystem, 17, 5390, new AttackType[] {  }, new[] { AttackType.Radiation, AttackType.Bludgeoning }, 4507, AttackType.Fire, 2),
                new Unit(UnitType.ImmuneSystem, 989, 1274, new AttackType[] { AttackType.Fire }, new[] { AttackType.Bludgeoning, AttackType.Slashing }, 25, AttackType.Slashing, 3),

                new Unit(UnitType.Infection, 801, 4706, new AttackType[] {  }, new[] { AttackType.Radiation }, 116, AttackType.Bludgeoning, 1),
                new Unit(UnitType.Infection, 4485, 2961, new AttackType[] { AttackType.Radiation }, new[] { AttackType.Fire, AttackType.Ice }, 12, AttackType.Slashing, 4),
            };
        }
    }

    class Unit
    {
        public Guid Id { get; } = Guid.NewGuid();
        public Guid TargetId { get; set; }
        public Guid TargetedById { get; set; }
        public int EffectivePower => Count * Damage;
        public UnitType UnitType { get; set; }
        public AttackType AttackType { get; set; }
        public AttackType[] ImmuneTo { get; set; }
        public AttackType[] WeakTo { get; set; }
        public int Count { get; set; }
        public int HitPoints { get; set; }
        public int Damage { get; set; }
        public int Initiative { get; set; }

        internal int CalculateDamage(AttackType attackType, int effectivePower)
        {
            if (ImmuneTo.Contains(attackType))
            {
                return 0;
            }
            if (WeakTo.Contains(attackType))
            {
                return 2 * effectivePower;
            }

            return effectivePower;
        }

        internal void Hit(AttackType attackType, int effectivePower)
        {
            var damage = CalculateDamage(attackType, effectivePower);
            var unitsKilled = damage / HitPoints;
            Count = Math.Max(Count - unitsKilled, 0);
        }

        public Unit(UnitType unitType, int count, int hitPoints, AttackType[] immuneTo, AttackType[] weakTo, int damage, AttackType attackType, int initiative)
        {
            this.UnitType = unitType;
            this.Count = count;
            this.HitPoints = hitPoints;
            this.ImmuneTo = immuneTo;
            this.WeakTo = weakTo;
            this.Damage = damage;
            this.AttackType = attackType;
            this.Initiative = initiative;
        }
    }

    enum AttackType
    {
        Bludgeoning,
        Radiation,
        Fire,
        Slashing,
        Ice,
    }

    enum UnitType
    {
        Infection,
        ImmuneSystem
    }
}
