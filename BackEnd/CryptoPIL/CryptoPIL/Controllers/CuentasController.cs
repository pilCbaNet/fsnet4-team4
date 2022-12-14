using Entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        // GET: api/
        [EnableCors("AllowAllOrigins")]
        [HttpGet]
        public List<Cuenta> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.Cuentas.ToList();
            }
        }

        // GET api/<CuentasController>/5
        [EnableCors("AllowAllOrigins")]
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
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public ActionResult Post(Cuenta cuenta)
        {
            using (var db = new CryptoPILContext())
            {
                var existeCuenta = db.Cuentas.FirstOrDefault(x => x.IdCuenta == cuenta.IdCuenta);
                if (existeCuenta != null)
                {
                    return BadRequest("La cuenta ya existe");
                }
                db.Add(cuenta);
                db.SaveChanges();
                List<Cuenta> cuentas = db.Cuentas.ToList();
                var cuentaCreada = cuentas[cuentas.Count - 1];
                return Ok(cuentaCreada);
            }
        }

        // PUT api/<CuentasController>/5
        [EnableCors("AllowAllOrigins")]
        [HttpPut("{IdCuenta}")]
        public Cuenta Put(int IdCuenta, [FromBody] Cuenta cuentaActualizada)
        {
            
                using (var db = new CryptoPILContext())
                {
                    var CuentaModificar = db.Cuentas.FirstOrDefault(x => x.IdCuenta == IdCuenta);
                    if (CuentaModificar != null)
                    {
                        
                        CuentaModificar.SaldoTotal += cuentaActualizada.SaldoTotal;



                        db.SaveChanges();
                        return cuentaActualizada;

                    }
                else { return null; }
                }
                
            
            
        }

        // DELETE api/<CuentasController>/5
        [HttpDelete("{IdCuenta}")]
        public ActionResult Delete(int IdCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                var existeCuenta = db.Cuentas.FirstOrDefault(x => x.IdCuenta == IdCuenta);
                if (existeCuenta == null)
                {
                    return NotFound();
                }

                db.Remove(new Cuenta() { IdCuenta= IdCuenta });
                db.SaveChanges();
                return Ok();

            }

        }
    }
}
