using System;
using System.Collections.Generic;

namespace part1
{
    class Program
    {
        static void Main(string[] args)
        {
            var units = new List<Unit>{
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
    }

    class Unit
    {
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

        public UnitType UnitType { get; set; }
        public AttackType AttackType { get; set; }

        public AttackType[] ImmuneTo { get; set; }

        public AttackType[] WeakTo { get; set; }

        public int Count { get; set; }

        public int HitPoints { get; set; }

        public int Damage { get; set; }
        public int Initiative { get; set; }
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
