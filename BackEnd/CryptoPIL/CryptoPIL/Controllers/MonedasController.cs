using CryptoPIL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CryptoPIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonedasController : ControllerBase
    {
        [HttpGet]
        public List<Moneda> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.Monedas.ToList();
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetTarjeta(int id)
        {
            try
            {
                using (var db = new CryptoPILContext())
                {
                    var listMonedas = await db.Monedas.ToListAsync();
                    var este = new Moneda();
                    foreach (var item in listMonedas)
                    {
                        if (item.IdMoneda == id)
                        {
                            este = item;
                        }
                    }
                    return Ok(este);
                }


            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
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


        [HttpPut]
        public void Put([FromBody] Moneda oMoneda)
        {
            using (var db = new CryptoPILContext())
            {
                Moneda? monedaVieja = db.Monedas.FirstOrDefault(a=> a.IdMoneda == oMoneda.IdMoneda);
                monedaVieja.Nombre = oMoneda.Nombre;
                db.SaveChanges();
            }
        }
    }
}
