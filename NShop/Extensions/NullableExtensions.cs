using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NShop.Extensions
{
    public static class NullableExtensions
    {
        public static bool IsEmpty<T>(this Nullable<T> nullable) where T: struct
        {
            return !nullable.HasValue;
        }
    }
}
