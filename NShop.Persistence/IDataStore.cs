using NShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.DataStore
{
    public interface IDataStore
    {
        #region Products DataStore contracts
        Task<Product> CreateProduct(Product product);
        Task<IEnumerable<Product>> Products(Guid userId);
        Task<Product> ProductById(Guid userId, int id);
        Task<ApplicationUser> GetApplicationUser(string emailAddress);
        #endregion
    }
}
