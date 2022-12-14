using Microsoft.AspNetCore.Mvc;
using Entidades;
using Negocios;
using Microsoft.AspNetCore.Cors;

namespace CryptoPIL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        [Route("Login")]
        public Usuario PostLogin([FromBody] Login oLogin)
        {
            using (var db = new CryptoPILContext())
            {
                var user = new UsuariosBC().ObtenerUsuarios(db).Where(auth => auth.Email == oLogin.Email && auth.Password == oLogin.Password).FirstOrDefault();
                if (user == null)
                {
                    return new Usuario();
                }
                return user;
            }
        }

        // GET: api/<UsuariosController>
        [EnableCors("AllowAllOrigins")]
        [HttpGet]
        public List<Usuario> Get()
        {
            using (var db = new CryptoPILContext())
            {
                return new UsuariosBC().ObtenerUsuarios(db);
            }
        }

        // GET api/<UsuariosController>/5
        [EnableCors("AllowAllOrigins")]
        [HttpGet("{id}")]
        public Usuario? GetById(int id)
        {
            using (var db = new CryptoPILContext())
            {
                return new UsuariosBC().ObtenerUsuario(db, id);
            }
        }

        // POST api/<UsuariosController>
        [EnableCors("AllowAllOrigins")]
        [HttpPost]
        public Usuario? Post([FromBody] Usuario oUsuario)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }

            using (var db = new CryptoPILContext())
            {
                db.Usuarios.Add(oUsuario);
                db.SaveChanges();
                var user = new UsuariosBC().ObtenerUsuarios(db).Where(auth => auth.Email == oUsuario.Email && auth.Password == oUsuario.Password).FirstOrDefault();
                return user;
            }
            
            
        }

        // PUT api/<UsuariosController>/5
        [EnableCors("AllowAllOrigins")]
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Usuario oUsuarioActualizado)
        {   
            try
            {
                using (var db = new CryptoPILContext())
                {
                    var oUsuarioAModificar = db.Usuarios.FirstOrDefault(user => user.IdUsuario == id);
                    if (oUsuarioAModificar != null)
                    {
                        oUsuarioAModificar.Apellido = oUsuarioActualizado.Apellido;
                        oUsuarioAModificar.Nombre = oUsuarioActualizado.Nombre;
                        oUsuarioAModificar.Dni = oUsuarioActualizado.Dni;
                        oUsuarioAModificar.Email = oUsuarioActualizado.Email;
                        oUsuarioAModificar.Password = oUsuarioActualizado.Password;
                        oUsuarioAModificar.FechaNacimiento = oUsuarioActualizado.FechaNacimiento;
                        oUsuarioAModificar.IdCuenta = oUsuarioActualizado.IdCuenta;
                        db.SaveChanges();
                        return "Usuario modificado con éxito";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return "Error. No se ha podido modificar";
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            try
            {
                using (var context = new CryptoPILContext())
                {
                    Usuario? clienteAEliminar = context.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
                    if (clienteAEliminar != null )
                    {
                        clienteAEliminar.FechaBaja = DateTime.Now;
                        context.SaveChanges();
                        return "Usuario eliminado con éxito";
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return "Error. No se ha podido eliminar";
        }
    }
}