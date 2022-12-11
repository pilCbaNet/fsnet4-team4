using Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocios
{
    public class MonedasDeCuentaBC
    {
        public List<MonedasDeCuenta> ObtenerMonedasDeCuenta(CryptoPILContext db, int id)
        {
            var listMonedas = db.MonedasDeCuenta.ToList();
            List<MonedasDeCuenta> este = new List<MonedasDeCuenta>();
            foreach (var item in listMonedas)
            {
                if (item.IdCuenta== id)
                {
                    este.Add(item) ;
                }
            }
            return este;
        }
    }
}
