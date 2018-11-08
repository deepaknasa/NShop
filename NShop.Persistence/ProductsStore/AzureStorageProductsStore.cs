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
        public Task<IEnumerable<Product>> Products(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<Product> ProductById(Guid userId, int id)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUser> GetApplicationUser(string emailAddress)
        {
            throw new NotImplementedException();
        }

        public Task<Product> CreateProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
