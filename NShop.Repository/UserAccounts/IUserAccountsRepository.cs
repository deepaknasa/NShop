using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.Repository.UserAccounts
{
    public interface IUserAccountsRepository
    {
        Task<Guid?> GetUserId(string emailID);
    }
}
