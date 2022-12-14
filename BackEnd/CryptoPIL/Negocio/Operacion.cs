using System;
using System.Collections.Generic;

namespace CryptoPIL.Models
{
    public partial class Operacion
    {
        public int IdOperacion { get; set; }
        public int IdMoneda { get; set; }
        public double Unidades { get; set; }
        public DateTime FechaOperacion { get; set; }
        public decimal Monto { get; set; }
        public int IdTipoOperacion { get; set; }
        public int IdCuenta { get; set; }

        public virtual Cuenta IdCuentaNavigation { get; set; } = null!;
        public virtual Moneda IdMonedaNavigation { get; set; } = null!;
        public virtual TipoOperacion IdTipoOperacionNavigation { get; set; } = null!;
    }
}
