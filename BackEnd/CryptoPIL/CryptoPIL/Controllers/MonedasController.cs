
using Entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocios;

namespace CryptoPIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonedasController : ControllerBase
    {
        [EnableCors("AllowAllOrigins")]
        [HttpGet]
        public List<Moneda> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return new MonedasBC().ObtenerMonedas(db);
            }
            
        }

        [HttpGet("{id:int}")]
        public Moneda GetMoneda(int id)
        {
            
                using (var db = new CryptoPILContext())
                {
                    return new MonedasBC().ObtenerMoneda(db, id);
                }
        }

        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public void Post([FromBody] Moneda oMoneda)
        {
            using (var db = new CryptoPILContext())
            {
                db.Monedas.Add(oMoneda);
                db.SaveChanges();
            }
        }

        [EnableCors("AllowAllOrigins")]
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
