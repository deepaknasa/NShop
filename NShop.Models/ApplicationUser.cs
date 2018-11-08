using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NShop.Models
{
    public class ApplicationUser
    {
        public Guid UserId { get; set; }
        public string EmailAddress { get; set; }
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
    }
}
