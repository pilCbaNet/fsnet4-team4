using CryptoPIL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoPIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonedasController : ControllerBase
    {
        [HttpGet]
        public List<Moneda> Get()
        {
            using(var db = new CryptoPILContext())
            {
                return db.Monedas.ToList();
            }
        }

        [HttpPost]
        public void Post([FromBody] Moneda oMoneda)
        {
            using (var db = new CryptoPILContext())
            {
                db.Monedas.Add(oMoneda);
                db.SaveChanges();
            }
        }
    }
}
