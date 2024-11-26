using System.ComponentModel.DataAnnotations.Schema;

namespace CludeSaude.Models
{
    [Table("Especialidades")]
    public class Especialidade
    {
        public int Id { get; set; }
        public string NomeEspecialidade { get; set; }
        public string TipoDocumento { get; set; }

    }
}
