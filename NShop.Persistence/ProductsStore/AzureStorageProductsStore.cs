using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NShop.Models;

namespace NShop.DataStore.ProductsStore
{
    public class AzureStorageProductsStore : IDataStore
    {
        public Task<IEnumerable<Product>> Products()
        {
            throw new NotImplementedException();
        }

        public Task<Product> ProductById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Product> CreateProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
