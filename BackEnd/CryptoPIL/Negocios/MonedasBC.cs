using Entidades;
using Microsoft.EntityFrameworkCore;

namespace Negocios
{
    public class MonedasBC
    {

        public List<Moneda> ObtenerMonedas(CryptoPILContext db)
        {
            return db.Monedas.ToList();
        }

        public Moneda ObtenerMoneda(CryptoPILContext db, int id)
        {
            var listMonedas = db.Monedas.ToList();
            var este = new Moneda();
            foreach (var item in listMonedas)
            {
                if (item.IdMoneda == id)
                {
                    este = item;
                }
            }
            return este;
        }
    }
}