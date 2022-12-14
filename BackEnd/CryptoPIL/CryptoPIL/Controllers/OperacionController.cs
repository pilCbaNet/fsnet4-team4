using Negocios;
using Entidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacionesController : ControllerBase
    {
        [EnableCors("AllowAllOrigins")]
        [HttpGet]
        public List<Operacion> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.Operaciones.ToList();
            }

        }

        [EnableCors("AllowAllOrigins")]
        [HttpGet("{idCuenta}")]
        public List<Operacion> Get(int idCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                return new OperacionesBC().ObtenerOperacion(db, idCuenta);
            }

        }


        // POST api/<UsuariosController>
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public Operacion? Post([FromBody] Operacion oOperacion)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }

            using (var db = new CryptoPILContext())
            {
                db.Operaciones.Add(oOperacion);
                db.SaveChanges();
            }

            return oOperacion;
        }
    }
}
