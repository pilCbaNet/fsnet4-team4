using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entidades
{
    public  class MonedasDeCuenta
    {
        
        public int IdMonedasDeCuenta { get; set; }
        public int IdCuenta { get; set; }
        public int IdMoneda { get; set; }
        public double Unidades { get; set; }
        public decimal SaldoMoneda { get; set; }

        public virtual Cuenta IdCuentaNavigation { get; set; } = null!;
        public virtual Moneda IdMonedaNavigation { get; set; } = null!;
    }
}
