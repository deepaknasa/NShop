using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NShop.Models;
using NShop.Extensions;
using NShop.Repository.Products;
using NShop.Repository.UserAccounts;

namespace NShop.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        IProductsRepository _productRepository;
        IUserAccountsRepository _userAccountRepository;
        public ProductsController(IProductsRepository repository, IUserAccountsRepository userAccountRepository)
        {
            _productRepository = repository;
            _userAccountRepository = userAccountRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            WriteClaims();
            var appUser = HttpContext.User.AppUser();
            var userId =
                await _userAccountRepository
                .GetUserId(appUser.EmailAddress)
                .ConfigureAwait(continueOnCapturedContext: false);
            if (userId.IsEmpty())
            {
                return NotFound();
            }

            var products = await _productRepository.GetProductsAsync(userId.Value);
            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var appUser = User.AppUser();
            var userId = 
                await _userAccountRepository
                .GetUserId(appUser.EmailAddress)
                .ConfigureAwait(continueOnCapturedContext: false);
            if (userId.IsEmpty())
            {
                return NotFound();
            }

            var product = await _productRepository.GetProductByIdAsync(userId.Value, id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            var appUser = HttpContext.User.AppUser();
            var userId =
                await _userAccountRepository
                .GetUserId(appUser.EmailAddress)
                .ConfigureAwait(continueOnCapturedContext: false);
            if (userId.IsEmpty())
            {
                return NotFound();
            }
            if (product == null)
                return BadRequest();
            var productResponse = await _productRepository.CreateProductAsync(userId.Value, product);
            return Ok(productResponse);
        }

        public void WriteClaims()
        {
            foreach (var claim in HttpContext.User.Claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}. Claim Value: {claim.Value}");
            }
        }
    }
}
