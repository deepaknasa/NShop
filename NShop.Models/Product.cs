using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.Models
{
    public class Product
    {
        public Product(ProductUnit unit)
        {
            Unit = unit;
        }
        public Product()
        {

        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Available { get; set; }
        public ProductUnit Unit { get; }
    }
}
