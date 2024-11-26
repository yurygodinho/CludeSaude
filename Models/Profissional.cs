using CludeSaude.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CludeSaude.Model
{
    [Table("Profissional")]
    public class Profissional
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public Especialidade Especialidade { get; set; }
        public int? EspecialidadeId { get; set; }
        public string NumeroDocumento { get; set; }

    }
}
