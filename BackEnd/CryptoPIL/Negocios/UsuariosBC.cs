using Entidades;
using Microsoft.EntityFrameworkCore;

namespace Negocios
{
    public class UsuariosBC
    {
        public List<Usuario> ObtenerUsuarios(CryptoPILContext db)
        {
            return db.Usuarios.Where(u => u.FechaBaja == null).ToList();
        }

        public Usuario ObtenerUsuario(CryptoPILContext db, int id)
        {
            var usuario = db.Usuarios.Where(u => u.FechaBaja == null).ToList();
            var este = new Usuario();
            foreach (var item in usuario)
            {
                if (item.IdUsuario == id)
                {
                    este = item;
                }
            }
            return este;
        }
    }
}
