using NShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NShop.Extensions
{
    public static class ClaimsExtensions
    {
        public static ApplicationUser AppUser(this ClaimsPrincipal principal)
        {
            var appUser = new ApplicationUser
            {
                EmailAddress = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value,
                Name = principal.Claims.FirstOrDefault(c => c.Type == "name").Value,
                GivenName = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname").Value,
                Surname = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname").Value
            };

            return appUser;
        }
    }
}
