using NShop.Models;
using NShop.Persistence.ProductsStore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NShop.DataStore.ProductsStore
{
    public class InMemoryProductsStore : IDataStore
    {
        private static IEnumerable<Product> _products;
        private static IEnumerable<ApplicationUser> _users;
        private static IEnumerable<UserProducts> _userProducts;

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
                },
                new Product(ProductUnit.Piece){
                    Id = 3,
                    Name = "Mango",
                    Description = "Delicious mangoes",
                    Price = 2.5f,
                    Available = 0
                }
            };

            _users = new List<ApplicationUser>
            {
                new ApplicationUser {
                    EmailAddress = "nshop4u@gmail.com",
                    GivenName = "nShop4",
                    Surname = "healthy",
                    Name = "nshop4 healthy",
                    UserId = Guid.NewGuid()
                },
                new ApplicationUser {
                    EmailAddress = "1234@gmail.com",
                    GivenName = "1234",
                    Surname = "user",
                    Name = "1234 user",
                    UserId = Guid.NewGuid()
                }
            };

            var nShop4Products = new[] { 1, 2 }; // this is temp data not persisted anywhere.
            _userProducts = new List<UserProducts> {
                new UserProducts {
                    UserId = _users.First(u => u.EmailAddress == "nshop4u@gmail.com").UserId,
                    Products = _products.Where(p => nShop4Products.Contains(p.Id)).ToList() }
            };
        }

        private IEnumerable<Product> UserProducts(Guid userId)
        {
            return _userProducts.First(up => up.UserId == userId).Products;
        }

        public async Task<IEnumerable<Product>> Products(Guid userId)
        {
            return await Task.FromResult(UserProducts(userId));
        }

        public async Task<Product> ProductById(Guid userId, int id)
        {
            return await Task.FromResult(UserProducts(userId).FirstOrDefault(p => p.Id == id));
        }

        public async Task<ApplicationUser> GetApplicationUser(string emailAddress)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.EmailAddress == emailAddress));
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
