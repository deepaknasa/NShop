using NShop.DataStore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.Repository.UserAccounts
{
    public class UserAccountsRepository : IUserAccountsRepository
    {
        IDataStore _dataStore;
        public UserAccountsRepository(IDataStore dataStore)
        {
            _dataStore = dataStore;
        }

        public async Task<Guid?> GetUserId(string emailID)
        {
            var userInfo = await _dataStore.GetApplicationUser(emailID);
            return userInfo.UserId;
        }
    }
}
