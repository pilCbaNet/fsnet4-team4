using Entidades;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Negocios;

namespace CryptoPILWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public Usuario? PostLogin([FromBody] Login oLogin)
        {
            Usuario? oLoginResult;
            using (var db = new CryptoPILContext())
            {
                oLoginResult = new UsuariosBC().Login(db, oLogin);
                
            }
            return oLoginResult;
        }
    }
}
