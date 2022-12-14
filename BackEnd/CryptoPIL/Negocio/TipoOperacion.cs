﻿using System;
using System.Collections.Generic;

namespace CryptoPIL.Models
{
    public partial class TipoOperacion
    {
        public TipoOperacion()
        {
            Operaciones = new HashSet<Operacion>();
        }

        public int IdTipoOperacion { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Operacion> Operaciones { get; set; }
    }
}
