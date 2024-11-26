using CludeSaude.Models;
using System.ComponentModel.DataAnnotations;

namespace CludeSaude.ViewModels
{
    public class CreateProfissionalViewModel
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public int? EspecialidadeId { get; set; }
        [Required]
        public string NumeroDocumento { get; set; }

    }
}
