using System;
using System.Collections.Generic;

namespace CryptoPIL.Models
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int Dni { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
        public int IdCuenta { get; set; }

        public virtual Cuenta IdCuentaNavigation { get; set; } = null!;
    }
}
