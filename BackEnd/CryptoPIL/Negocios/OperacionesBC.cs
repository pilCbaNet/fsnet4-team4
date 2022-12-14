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
        public List<Operacion>  ObtenerOperacion(CryptoPILContext db, int id)
        {
            var listOperacion = db.Operaciones.ToList();
            List<Operacion> este = new List<Operacion>();
            foreach (var item in listOperacion)
            {
                if (item.IdCuenta == id)
                {
                    este.Add(item);
                }
            }
            return este;
        }
    }
}
