using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NShop.Models;
using NShop.Repository.Products;

namespace NShop.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        IProductsRepository _productRepository;
        public ProductsController(IProductsRepository repository)
        {
            _productRepository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productRepository.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (product == null)
                return BadRequest();
            var productResponse = await _productRepository.CreateProductAsync(product);
            return Ok(productResponse);
        }
    }
}
