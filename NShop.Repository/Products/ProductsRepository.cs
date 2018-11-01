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

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _dataStore.ProductById(id);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _dataStore.Products();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            return await _dataStore.CreateProduct(product);
        }

        public async Task DeleteProductAsync(Product product)
        {
            await Task.Delay(1000);
            throw new NotImplementedException();
        }

        public async Task UpdateProductAsync(Product product)
        {
            await Task.Delay(1000);
        }
    }
}
