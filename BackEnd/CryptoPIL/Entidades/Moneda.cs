using System;
using System.Collections.Generic;

namespace Entidades
{
    public partial class Moneda
    {
        public Moneda()
        {
            MonedasDeCuenta = new HashSet<MonedasDeCuenta>();
            Operaciones = new HashSet<Operacion>();
        }

        public int IdMoneda { get; set; }
        public string Nombre { get; set; } = null!;
        public decimal PrecioXunidad { get; set; }

        public virtual ICollection<MonedasDeCuenta> MonedasDeCuenta { get; set; }
        public virtual ICollection<Operacion> Operaciones { get; set; }
    }
}
