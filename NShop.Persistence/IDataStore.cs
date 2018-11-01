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
        Task<IEnumerable<Product>> Products();
        Task<Product> ProductById(int id);
        Task<Product> CreateProduct(Product product);
        #endregion
    }
}
