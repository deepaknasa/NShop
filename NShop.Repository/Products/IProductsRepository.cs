using NShop.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NShop.Repository.Products
{
    public interface IProductsRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync(Guid userId);
        Task<Product> GetProductByIdAsync(Guid userId, int id);
        Task UpdateProductAsync(Guid userId, Product product);
        Task<Product> CreateProductAsync(Guid userId, Product product);
        Task DeleteProductAsync(Guid userId, Product product);
    }
}
