using NShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NShop.DataStore.ProductsStore
{
    public class InMemoryProductsStore : IDataStore
    {
        private static IEnumerable<Product> _products;

        public InMemoryProductsStore()
        {
            _products = new List<Product> {
                new Product(ProductUnit.Piece){
                    Id = 1,
                    Name = "Apple",
                    Description = "Delicious red apple",
                    Price = 12.5f,
                    Available = 10
                },
                new Product(ProductUnit.Dozen){
                    Id = 2,
                    Name = "Banana",
                    Description = "Sweet yellow bananas",
                    Price = 11f,
                    Available = 5
                }
            };
        }

        public async Task<IEnumerable<Product>> Products()
        {
            return await Task.FromResult(_products);
        }

        public async Task<Product> ProductById(int id)
        {
            return await Task.FromResult(_products.Where(p => p.Id == id).FirstOrDefault());
        }

        public Task<Product> CreateProduct(Product product)
        {
            if (product == null)
                throw new ArgumentNullException("product");
            product.Id = _products.Max(x => x.Id) + 1;
            ((List<Product>)_products).Add(product);
            return Task.FromResult(product);
        }
    }
}
