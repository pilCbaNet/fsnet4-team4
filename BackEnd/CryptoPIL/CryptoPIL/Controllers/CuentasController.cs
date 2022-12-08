using Entidades;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        // GET: api/
        [HttpGet]
        public List<Cuenta> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.Cuentas.ToList();
            }
        }

        // GET api/<CuentasController>/5
        [HttpGet("{IdCuenta}")]
        public ActionResult<Cuenta> GetById(int IdCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                var existeCuenta = db.Cuentas.FirstOrDefault(x => x.IdCuenta == IdCuenta);
                if (existeCuenta == null)
                {
                    return NotFound();
                }
                return Ok(existeCuenta);
            }
        }

        // POST api/<CuentasController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CuentasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CuentasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
