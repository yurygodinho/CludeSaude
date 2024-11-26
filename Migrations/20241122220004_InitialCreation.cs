using Microsoft.EntityFrameworkCore.Migrations;

namespace CludeSaude.Migrations
{
    public partial class InitialCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Especialidades",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NomeEspecialidade = table.Column<string>(type: "TEXT", nullable: true),
                    TipoDocumento = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Especialidades", x => x.Id);
                });

            // Inserindo dados na tabela Especialidades
            migrationBuilder.InsertData(
                table: "Especialidades",
                columns: new[] { "NomeEspecialidade", "TipoDocumento" },
                values: new object[,]
                {
                    { "Cardiologia", "CRM" }, { "Ortopedia", "CRM" }, { "Pediatria", "CRM" },
                    { "Dermatologia", "CRM" }, { "Ginecologia", "CRM" }, { "Neurologia", "CRM" },
                    { "Psiquiatria", "CRM" }, { "Anestesiologia", "CRM" }, { "Endocrinologia", "CRM" },
                    { "Nutricionista Clínico", "CRN" }, { "Nutrição Esportiva", "CRN" },
                    { "Nutrição Oncológica", "CRN" }, { "Fisioterapia Ortopédica", "CREFITO" },
                    { "Fisioterapia Neurológica", "CREFITO" }, { "Fisioterapia Respiratória", "CREFITO" },
                    { "Ortodontia", "CRO" }, { "Implantodontia", "CRO" }, { "Endodontia", "CRO" },
                    { "Enfermagem Geral", "COREN" }, { "Enfermagem Obstétrica", "COREN" },
                    { "Psicologia Clínica", "CRP" }, { "Psicologia Organizacional", "CRP" },
                    { "Neuropsicologia", "CRP" }, { "Farmácia Clínica", "CRF" },
                    { "Farmácia Hospitalar", "CRF" }, { "Análises Clínicas", "CRF" },
                    { "Personal Trainer", "CREF" }
                });

            migrationBuilder.CreateTable(
                name: "Profissional",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    EspecialidadeId = table.Column<int>(type: "INTEGER", nullable: true),
                    NumeroDocumento = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profissional", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Profissional_Especialidades_EspecialidadeId",
                        column: x => x.EspecialidadeId,
                        principalTable: "Especialidades",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Profissional_EspecialidadeId",
                table: "Profissional",
                column: "EspecialidadeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Profissional");

            migrationBuilder.DropTable(
                name: "Especialidades");
        }
    }
}
