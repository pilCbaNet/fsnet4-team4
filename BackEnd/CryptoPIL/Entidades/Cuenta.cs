using System;
using System.Collections.Generic;

namespace Entidades
{
    public partial class Cuenta
    {
        public Cuenta()
        {
            MonedasDeCuenta = new HashSet<MonedasDeCuenta>();
            Operaciones = new HashSet<Operacion>();
            Usuarios = new HashSet<Usuario>();
        }

        public int IdCuenta { get; set; }
        public int Cbu { get; set; }
        public decimal SaldoTotal { get; set; }

        public virtual ICollection<MonedasDeCuenta> MonedasDeCuenta { get; set; }
        public virtual ICollection<Operacion> Operaciones { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
