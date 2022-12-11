using Negocios;
using Entidades;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperacionesController : ControllerBase
    {

        [HttpGet]
        public List<Operacion> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return db.Operaciones.ToList();
            }

        }

       
        [HttpGet("{idCuenta}")]
        public List<Operacion> Get(int idCuenta)
        {
            using (var db = new CryptoPILContext())
            {
                return new OperacionesBC().ObtenerOperacion(db, idCuenta);
            }

        }
    }
}
