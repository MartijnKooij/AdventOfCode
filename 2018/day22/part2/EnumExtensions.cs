using System;
using System.ComponentModel;
using System.Reflection;

namespace part2
{
    /// <summary>
    /// Enum type extension methods
    /// </summary>
    public static class EnumExtensions
    {
        /// <summary>
        /// Get the description of an enum value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="enumerationValue"></param>
        /// <returns></returns>
        public static string GetDescription<T>(this T enumerationValue) where T : struct
        {
            Type type = enumerationValue.GetType();
            if (!type.IsEnum)
            {
                throw new ArgumentException("EnumerationValue must be of Enum type", nameof(enumerationValue));
            }

            MemberInfo[] memberInfo = type.GetMember(enumerationValue.ToString());
            if (memberInfo.Length <= 0)
            {
                return enumerationValue.ToString();
            }

            object[] attrs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
            return attrs.Length > 0 ? ((DescriptionAttribute) attrs[0]).Description : enumerationValue.ToString();
        }

        /// <summary>
        /// Typed enum parsing
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T ToEnum<T>(this string value)
        {
            return (T)Enum.Parse(typeof(T), value, true);
        }

        /// <summary>
        /// Tries to find the enum value with the given description attribute
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="description"></param>
        /// <returns></returns>
        public static T ToEnumByDescription<T>(this string description) where T : struct
        {
            var enumValues = Enum.GetValues(typeof(T));

            foreach (T enumValue in enumValues)
            {
                var enumDescription = enumValue.GetDescription();
                if (enumDescription == description)
                {
                    return enumValue;
                }
            }

            throw new ArgumentOutOfRangeException($"Could find the enum with the given description {description}");
        }
    }
}