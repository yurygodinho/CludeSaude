using CludeSaude.Model;
using CludeSaude.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Profissional> Profissionais { get; set; }
    public DbSet<Especialidade> Especialidades { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("Data Source=app.db;Cache=Shared");
}

