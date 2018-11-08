using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NShop.DataStore;
using NShop.Models;

namespace NShop.Repository.Products
{
    public class ProductsRepository : IProductsRepository
    {
        IDataStore _dataStore;
        public ProductsRepository(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        public async Task<Product> GetProductByIdAsync(Guid userId, int id)
        {
            return await _dataStore.ProductById(userId, id);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(Guid userId)
        {
            return await _dataStore.Products(userId);
        }

        public async Task<Product> CreateProductAsync(Guid userId, Product product)
        {
            return await _dataStore.CreateProduct(product);
        }

        public async Task DeleteProductAsync(Guid userId, Product product)
        {
            await Task.Delay(1000);
            throw new NotImplementedException();
        }

        public async Task UpdateProductAsync(Guid userId, Product product)
        {
            await Task.Delay(1000);
        }
    }
}
