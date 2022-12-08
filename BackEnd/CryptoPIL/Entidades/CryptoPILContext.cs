using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entidades
{
    public partial class CryptoPILContext : DbContext
    {
        public CryptoPILContext()
        {
        }

        public CryptoPILContext(DbContextOptions<CryptoPILContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cuenta> Cuentas { get; set; } = null!;
        public virtual DbSet<Moneda> Monedas { get; set; } = null!;
        public virtual DbSet<MonedasDeCuenta> MonedasDeCuenta { get; set; } = null!;
        public virtual DbSet<Operacion> Operaciones { get; set; } = null!;
        public virtual DbSet<TipoOperacion> TipoOperaciones { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-A9CLA51\\SQLEXPRESS; Database=CryptoPIL; User=sa; Password=123456; TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cuenta>(entity =>
            {
                entity.HasKey(e => e.IdCuenta);

                entity.Property(e => e.IdCuenta).HasColumnName("Id_Cuenta");

                entity.Property(e => e.Cbu).HasColumnName("CBU");

                entity.Property(e => e.SaldoTotal).HasColumnType("money");
            });

            modelBuilder.Entity<Moneda>(entity =>
            {
                entity.HasKey(e => e.IdMoneda);

                entity.Property(e => e.IdMoneda).HasColumnName("Id_Moneda");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PrecioXunidad)
                    .HasColumnType("money")
                    .HasColumnName("PrecioXUnidad");
            });

            modelBuilder.Entity<MonedasDeCuenta>(entity =>
            {
                entity.HasKey(e => e.IdMonedasDeCuenta);

                entity.Property(e => e.IdMonedasDeCuenta).HasColumnName("Id_MonedasDeCuenta");

                entity.Property(e => e.IdCuenta).HasColumnName("Id_Cuenta");

                entity.Property(e => e.IdMoneda).HasColumnName("Id_Moneda");

                entity.Property(e => e.SaldoMoneda).HasColumnType("money");

                entity.HasOne(d => d.IdCuentaNavigation)
                    .WithMany(p => p.MonedasDeCuenta)
                    .HasForeignKey(d => d.IdCuenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MonedasDeCuenta_Cuenta");

                entity.HasOne(d => d.IdMonedaNavigation)
                    .WithMany(p => p.MonedasDeCuenta)
                    .HasForeignKey(d => d.IdMoneda)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MonedasDeCuenta_Monedas");
            });

            modelBuilder.Entity<Operacion>(entity =>
            {
                entity.HasKey(e => e.IdOperacion);

                entity.Property(e => e.IdOperacion).HasColumnName("Id_Operacion");

                entity.Property(e => e.FechaOperacion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdCuenta).HasColumnName("Id_Cuenta");

                entity.Property(e => e.IdMoneda).HasColumnName("Id_Moneda");

                entity.Property(e => e.IdTipoOperacion).HasColumnName("Id_TipoOperacion");

                entity.Property(e => e.Monto).HasColumnType("money");

                entity.HasOne(d => d.IdCuentaNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdCuenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Operaciones_Cuenta");

                entity.HasOne(d => d.IdMonedaNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdMoneda)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Operaciones_Monedas");

                entity.HasOne(d => d.IdTipoOperacionNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.IdTipoOperacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Operaciones_TipoOperaciones");
            });

            modelBuilder.Entity<TipoOperacion>(entity =>
            {
                entity.HasKey(e => e.IdTipoOperacion);

                entity.Property(e => e.IdTipoOperacion).HasColumnName("Id_TipoOperacion");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.IdUsuario).HasColumnName("Id_Usuario");

                entity.Property(e => e.Apellido)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Dni).HasColumnName("DNI");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaBaja).HasColumnType("datetime");

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.IdCuenta).HasColumnName("Id_Cuenta");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdCuentaNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdCuenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Usuarios_Cuentas");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
