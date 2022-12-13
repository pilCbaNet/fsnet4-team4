using Entidades;
using Microsoft.AspNetCore.Mvc;
using Entidades;
using Negocios;
using Microsoft.AspNetCore.Cors;

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

        [HttpGet("{IdCuenta}")]
        public List<MonedasDeCuenta> GetById(int IdCuenta)
        {
            using (var db = new CryptoPILContext())
            {

                List<MonedasDeCuenta> existeMonedaDeCuenta = new MonedasDeCuentaBC().ObtenerMonedasDeCuenta(db,IdCuenta);
                return existeMonedaDeCuenta;
            }
        }

        // POST api/<MonedasDeCuentaController>
        [EnableCors("AllowAllOrigins")]
        [HttpPost("{IdTipoOperacion}")]
        public ActionResult Post(int idTipoOperacion,MonedasDeCuenta monedaDeCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                
                
                
                        var existeMoneda = db.MonedasDeCuenta.FirstOrDefault(x => x.IdMoneda == monedaDeCuenta.IdMoneda && x.IdCuenta == monedaDeCuenta.IdCuenta);
                        if (existeMoneda != null)
                        {
                            if(idTipoOperacion == 2)
                            {
                                if(existeMoneda.SaldoMoneda > monedaDeCuenta.SaldoMoneda ||  existeMoneda.SaldoMoneda == 0)
                                {
                                    return Ok(null);
                                }
                                else
                                {
                                    existeMoneda.Unidades += monedaDeCuenta.Unidades;
                                    existeMoneda.SaldoMoneda += monedaDeCuenta.SaldoMoneda;
                                }
                            }
                            else
                            {
                             existeMoneda.Unidades += monedaDeCuenta.Unidades;
                                existeMoneda.SaldoMoneda += monedaDeCuenta.SaldoMoneda;
                            }



                        }
                        else
                        {
                            if(idTipoOperacion == 2)
                            {
                                return Ok(null);
                            }
                            else db.Add(monedaDeCuenta);
                            
                        }
                db.SaveChanges();
                return Ok("Moneda de cuenta creada con éxito");



            }
        }


        // PUT api/<MonedasDeCuentaController>/5
        [HttpPut("{IdMonedasDeCuenta}")]
        public string Put(int IdMonedasDeCuenta, [FromBody] MonedasDeCuenta monedaDeCuentaActualizada)
        {

            try
            {
                using (var db = new CryptoPILContext())
                {
                    var monedaDeCuentaModificar = db.MonedasDeCuenta.FirstOrDefault(x => x.IdMonedasDeCuenta == IdMonedasDeCuenta);
                    if (monedaDeCuentaModificar != null)
                    {
                        monedaDeCuentaModificar.Unidades = monedaDeCuentaActualizada.Unidades;
                        monedaDeCuentaModificar.SaldoMoneda = monedaDeCuentaActualizada.SaldoMoneda;

                        db.SaveChanges();
                        return "la moneda de cuenta fue  modificada con éxito";

                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            return "Error al modificar la moneda de cuenta";
        }

        // DELETE api/<MonedasDeCuentaController>/5
        [HttpDelete("{IdMonedasDeCuenta}")]
        public ActionResult Delete(int IdMonedasDeCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                var existeMonedaDeCuenta = db.MonedasDeCuenta.FirstOrDefault(x => x.IdMonedasDeCuenta == IdMonedasDeCuenta);
                if (existeMonedaDeCuenta == null)
                {
                    return NotFound();
                }

                db.Remove(new MonedasDeCuenta() { IdMonedasDeCuenta = IdMonedasDeCuenta });
                db.SaveChanges();
                return Ok();

            }

        }
    }
}
