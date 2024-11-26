using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace CludeSaude.Controllers
{
    [ApiController]
    [Route("v1")]
    public class EspecialidadeController:ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public EspecialidadeController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("especialidades")]
        public async Task<IActionResult> ObterAsync()
        {
            var especialidades = _appDbContext.Especialidades.ToList();
            return Ok(especialidades);
        }
    }
}
