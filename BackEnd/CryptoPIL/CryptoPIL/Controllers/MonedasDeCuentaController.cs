using Entidades;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonedasDeCuentaController : ControllerBase
    {
        // GET: api/<MonedasDeCuentaController>
        [HttpGet]
        public List<MonedasDeCuenta> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.MonedasDeCuenta.ToList();
            }
        }

        [HttpGet("{IdMonedasDeCuenta}")]
        public ActionResult<MonedasDeCuenta> GetById(int IdMonedasDeCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                var existeMonedaDeCuenta = db.MonedasDeCuenta.FirstOrDefault(x => x.IdMonedasDeCuenta == IdMonedasDeCuenta);
                if (existeMonedaDeCuenta == null)
                {
                    return NotFound();
                }
                return Ok(existeMonedaDeCuenta);
            }
        }

        // POST api/<MonedasDeCuentaController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<MonedasDeCuentaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MonedasDeCuentaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
