using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocios
{
    public class OperacionesBC
    {
        public Operacion ObtenerOperacion(CryptoPILContext db, int id)
        {
            var listOperacion = db.Operaciones.ToList();
            var este = new Operacion();
            foreach (var item in listOperacion)
            {
                if (item.IdOperacion == id)
                {
                    este = item;
                }
            }
            return este;
        }
    }
}
