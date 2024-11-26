using CludeSaude.Model;
using CludeSaude.Models;
using CludeSaude.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace CludeSaude.Controllers
{
    [ApiController]
    [Route("v1")]
    public class ProfissionalController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public ProfissionalController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        [Route("profissionais")]
        public async Task<IActionResult> ObterAsync()
        {
            var profissionais = _appDbContext.Profissionais
                .Join(
                    _appDbContext.Especialidades,
                    profissional => profissional.EspecialidadeId,
                    especialidade => especialidade.Id,
                    (profissional, especialidade) => new
                    {
                        ProfissionalId = profissional.Id,
                        ProfissionalNome = profissional.Nome,
                        ProfissionalNumeroDocumento = profissional.NumeroDocumento,
                        EspecialidadeNome = especialidade.NomeEspecialidade,
                        EspecialidadeTipoDocumento = especialidade.TipoDocumento,
                        EspecialidadeId = especialidade.Id,
                    }
                ).ToList();
            return Ok(profissionais);
        }



        [HttpGet]
        [Route("filtrar/profissionais/{tipo}")]
        public async Task<IActionResult> FiltrarAsync([FromRoute]string tipo)
        {
            var profissionais = _appDbContext.Profissionais
                   .Join(
                       _appDbContext.Especialidades, 
                       profissional => profissional.EspecialidadeId, 
                       especialidade => especialidade.Id, 
                       (profissional, especialidade) => new 
                       {
                           ProfissionalId = profissional.Id,
                           ProfissionalNome = profissional.Nome,
                           ProfissionalNumeroDocumento = profissional.NumeroDocumento,
                           EspecialidadeNome = especialidade.NomeEspecialidade,
                           EspecialidadeTipoDocumento = especialidade.TipoDocumento
                       }
                   )
                   .Where(result => string.IsNullOrEmpty(tipo) || result.EspecialidadeNome.Contains(tipo)) 
                   .ToList();

            return Ok(profissionais);

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> FiltrarAsync([FromRoute] int id)
        {
            var profissionais = await _appDbContext.Profissionais.AsNoTracking()
                                            .Where(x => x.Id == id)
                                            .FirstOrDefaultAsync();

            return profissionais == null ? NotFound() :
                Ok(profissionais);
        }

        [HttpPost("profissionais/adicionar")]
        public async Task<IActionResult> PostAsync([FromBody] CreateProfissionalViewModel profissional)
        {
            if(!ModelState.IsValid) 
                return BadRequest();

            var profissionalCreate = new Profissional
            {
                Nome = profissional.Nome,
                EspecialidadeId = profissional.EspecialidadeId,
                NumeroDocumento = profissional.NumeroDocumento
            };

            try
            {
                await _appDbContext.Profissionais.AddAsync(profissionalCreate);
                await _appDbContext.SaveChangesAsync();
                return Created(uri: $"v1/profissioanis/{profissional.Nome}", profissionalCreate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("profissionais/{id}")]
        public async Task<IActionResult> PutAsync([FromBody] CreateProfissionalViewModel profissional, [FromRoute]int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var profissionalUpdate = _appDbContext.Profissionais
                .Where(x => x.Id == id)
                .ToList(); 

            var profissionais = profissionalUpdate.FirstOrDefault();

            if (profissionais == null)
                return NotFound();

            try
            {
                profissionais.Nome = profissional.Nome;
                profissionais.NumeroDocumento = profissional.NumeroDocumento;
                profissionais.EspecialidadeId = profissional.EspecialidadeId;

                _appDbContext.Profissionais.Update(profissionais);
                await _appDbContext.SaveChangesAsync();
                return Ok(profissional);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }

        }

        [HttpDelete("profissionais/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            var profissionalUpdate = _appDbContext.Profissionais
                .Where(x => x.Id == id)
                .ToList();

            var profissional = profissionalUpdate.FirstOrDefault();

            if (profissional == null)
                return NotFound();

            try
            {
                _appDbContext.Profissionais.Remove(profissional); 

                await _appDbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao excluir o profissional: {ex.Message}");
            }
        }

    }
}
