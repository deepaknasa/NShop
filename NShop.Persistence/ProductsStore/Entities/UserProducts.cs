using NShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.Persistence.ProductsStore
{
    public class UserProducts
    {
        public Guid UserId { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
