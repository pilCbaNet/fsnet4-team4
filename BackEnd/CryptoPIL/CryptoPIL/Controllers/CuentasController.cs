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
                return Ok("La  cuenta fue  creada con éxito");
            }
        }

        // PUT api/<CuentasController>/5
        [HttpPut("{IdCuenta}")]
        public string Put(int IdCuenta, [FromBody] Cuenta cuentaActualizada)
        {
            try
            {
                using (var db = new CryptoPILContext())
                {
                    var CuentaModificar = db.Cuentas.FirstOrDefault(x => x.IdCuenta == IdCuenta);
                    if (CuentaModificar != null)
                    {
                        CuentaModificar.Cbu = cuentaActualizada.Cbu;
                        CuentaModificar.SaldoTotal = cuentaActualizada.SaldoTotal;



                        db.SaveChanges();
                        return "La  cuenta fue  modificada con éxito";

                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return "Error al modificar la  cuenta";
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
