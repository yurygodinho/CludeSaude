import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            selectedFilter: 'Todos',
            profissionais: [],
            especialidades: [],
            tipoDocumento: '',
            especialidadeSelecionada: null,
            modalOpen: false,
            loading: true,
            mensagemRetorno: '',
            modalExcluirOpen: false,
            profissionalExcluir: null,
        };
    }

    componentDidMount() {
        this.buscarProfissionais();
        this.buscarEspecialidades();
    }

    render() {
        return (
            <div>
                {this.state.loading ? <p><em>Loading...</em></p> : this.carregarTabela()}
            </div>
        );
    }

    carregarTabela() {
        const { selectedFilter, profissionais, especialidades, especialidadeSelecionada } = this.state;

        let profissionaisFiltrados = profissionais;
        if (especialidadeSelecionada && especialidadeSelecionada.id !== 'Todos') {
            profissionaisFiltrados = profissionais.filter(profissional =>
                profissional.especialidadeId === especialidadeSelecionada.id
            );
        }

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle cor-principal-clara"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Filtrar por: {this.state.selectedFilter}
                        </button>
                        <div className="dropdown-menu dropdown-menu-scrollable" aria-labelledby="dropdownMenuButton">
                            <a
                                className="dropdown-item text-dark"
                                href="#"
                                onClick={() => this.handleFilterChange('Todos')}
                            >
                                Todos
                            </a>
                            {especialidades.map((especialidade) => (
                                <a
                                    key={especialidade.id}
                                    className="dropdown-item text-dark"
                                    href="#"
                                    onClick={() => this.handleFilterChange(especialidade)}
                                >
                                    {especialidade.nomeEspecialidade}
                                </a>
                            ))}
                        </div>
                    </div>

                    {this.state.mensagemRetorno && (
                        <div className="ml-3 alert alert-info" role="alert">
                            {this.state.mensagemRetorno}
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-primary btn-sm cor-principal text-left"
                        onClick={this.handleOpenModal}
                    >
                        Adicionar +
                    </button>
                </div>

                <div className="container mt-5">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Especialidade</th>
                                <th>Tipo do Documento</th>
                                <th>Numero do Documento</th>
                                <th>Acoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profissionaisFiltrados.map((profissional) => (
                                <tr key={profissional.profissionalId}>
                                    <td>{profissional.profissionalId}</td>
                                    <td>{profissional.profissionalNome}</td>
                                    <td>{profissional.especialidadeNome}</td>
                                    <td>{profissional.especialidadeTipoDocumento}</td>
                                    <td>{profissional.profissionalNumeroDocumento}</td>
                                    <td>
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-link"
                                                type="button"
                                                id={`dropdownMenuButton-${profissional.profissionalId}`}
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                ...
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby={`dropdownMenuButton-${profissional.profissionalId}`}
                                            >
                                                <h6 className="dropdown-header">Acoes</h6>
                                                <a
                                                    className="dropdown-item text-dark"
                                                    href="#"
                                                    onClick={() => this.handleEdit(profissional.profissionalId)}
                                                >
                                                    Editar
                                                </a>
                                                <a
                                                    className="dropdown-item text-dark"
                                                    href="#"
                                                    onClick={() => this.handleOpenModalExcluir(profissional)}
                                                >
                                                    Excluir
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div
                    className={`modal fade ${this.state.modalOpen ? 'show' : ''}`}
                    style={{ display: this.state.modalOpen ? 'block' : 'none' }}
                    tabIndex="-1"
                    aria-labelledby="myModalLabel"
                    aria-hidden={!this.state.modalOpen}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 id="titulo-modal" className="modal-title">Adicionar Profissional</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={this.handleCloseModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" className="form-control" id="nome" placeholder="Nome do Profissional" />
                                    </div>
                                    <div className="dropdown">
                                    <div>
                                            <label>Especialidade</label>
                                        </div>
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {this.state.especialidadeSelecionada?.nomeEspecialidade || "Selecione a especialidade"}
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-scrollable">
                                            {this.state.especialidades.map((especialidade) => (
                                                <a
                                                    key={especialidade.id}
                                                    className="dropdown-item text-dark"
                                                    href="#"
                                                    onClick={() => this.handleEspecialidadeChange(especialidade)}
                                                >
                                                    {especialidade.nomeEspecialidade}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Tipo de Documento</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.tipoDocumento}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="numeroDocumento">Numero do Documento</label>
                                        <input type="text" className="form-control" id="numeroDocumento" placeholder="Numero do Documento" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={this.salvarNovoProfissional}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`modal fade ${this.state.modalExcluirOpen ? 'show' : ''}`}
                    style={{ display: this.state.modalExcluirOpen ? 'block' : 'none' }}
                    tabIndex="-1"
                    aria-labelledby="myModalLabelExcluir"
                    aria-hidden={!this.state.modalExcluirOpen}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 id="myModalLabelExcluir" className="modal-title">Excluir Profissional</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={this.handleCloseModalExcluir}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Tem certeza que deseja cancelar o cadastro do profissional{' '}
                                    {this.state.profissionalExcluir?.profissionalNome || 'Desconhecido'} (
                                    {this.state.profissionalExcluir?.especialidadeTipoDocumento || 'Desconhecido'} {' '}
                                    {this.state.profissionalExcluir?.profissionalNumeroDocumento || 'Desconhecido'}
                                    )? Essa acao nao podera ser desfeita!
                                </p>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.handleCloseModalExcluir}
                                >
                                    Voltar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        this.handleDelete(this.state.profissionalExcluir.profissionalId);
                                        this.handleCloseModalExcluir();
                                    }}
                                >
                                    Confirmar Cancelamento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }

    async buscarEspecialidades() {
        const response = await fetch('v1/especialidades');
        const data = await response.json();
        this.setState({ especialidades: data });
    }

    handleFilterChange = async (filter) => {
        this.setState({ selectedFilter: filter.nomeEspecialidade ?? 'Todos' });
        if (filter.nomeEspecialidade != undefined) {
            try {
                const response = await fetch(`v1/filtrar/profissionais/${filter.nomeEspecialidade}`);
                const data = await response.json();
                this.setState({ profissionais: data, });
            } catch (error) {
            }
        } else {
            this.buscarProfissionais();
        }
    };


    handleEspecialidadeChange = (especialidade) => {
        this.setState({
            especialidadeSelecionada: especialidade,
            tipoDocumento: especialidade.tipoDocumento,
        });
    };

    handleOpenModal = () => {
        this.setState({ modalOpen: true });
    };

    handleCloseModal = () => {
        document.getElementById("titulo-modal").textContent = "Adicionar profissional";
        this.limparDadosModal();
        this.setState({ modalOpen: false });
    };

    limparDadosModal = () => {
        this.setState({
            especialidadeSelecionada: null,
            tipoDocumento: '',
            profissionalIdEditar: null
        });
        document.getElementById("nome").value = '';
        document.getElementById("numeroDocumento").value = '';

    };


    salvarNovoProfissional = async () => {
        const { especialidadeSelecionada, profissionalIdEditar } = this.state;

        const nome = document.getElementById("nome").value;
        const numeroDocumento = document.getElementById("numeroDocumento").value;

        if (!especialidadeSelecionada) {
            alert("Por favor, selecione uma especialidade antes de salvar.");
            return;
        }

        if (!nome || !numeroDocumento) {
            alert("Por favor, preencha todos os campos obrigatorios.");
            return;
        }

        const novoProfissional = {
            Nome: nome,
            EspecialidadeId: especialidadeSelecionada.id,
            NumeroDocumento: numeroDocumento,
        };


        try {
            let response;
            if (profissionalIdEditar) {
                response = await fetch(`v1/profissionais/${profissionalIdEditar}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoProfissional),
                });
                this.setState({ mensagemRetorno: 'Profissional editado com sucesso!' });
            } else {
                response = await fetch("v1/profissionais/adicionar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoProfissional),
                });
                this.setState({ mensagemRetorno: 'Profissional adicionado com sucesso!' });
            }

            if (response.ok) {
                this.handleCloseModal();
                await this.buscarProfissionais();                
            } else {
                this.setState({ mensagemRetorno: 'Erro ao salvar profissional' });
            }
        } catch (error) {           
            alert("Ocorreu um erro ao tentar salvar o profissional.");
        }
    };


    async buscarProfissionais() {
        try {
            const response = await fetch("v1/profissionais");
            if (!response.ok) {
                throw new Error(`Erro na busca: ${response.statusText}`);
            }

            const data = await response.json();
            this.setState({ profissionais: data, loading: false });
        } catch (error) {
        }
    }

    handleEdit = (profissionalId) => {
        const profissional = this.state.profissionais.find(p => p.profissionalId === profissionalId);

        if (profissional) {
            this.setState({
                modalOpen: true,
                especialidadeSelecionada: {
                    id: profissional.especialidadeId,
                    nomeEspecialidade: profissional.especialidadeNome,
                },
                tipoDocumento: profissional.especialidadeTipoDocumento,
                profissionalIdEditar: profissionalId
            });

            document.getElementById("titulo-modal").textContent = "Editar Profissional";
            document.getElementById("nome").value = profissional.profissionalNome;
            document.getElementById("numeroDocumento").value = profissional.profissionalNumeroDocumento;
        }
    };

    handleOpenModalExcluir = (profissional) => {
        this.setState({
            modalExcluirOpen: true,
            profissionalExcluir: profissional,
        });
    };

    handleCloseModalExcluir = () => {
        this.setState({
            modalExcluirOpen: false,
            profissionalExcluir: null,
        });
    };


    async handleDelete(deletarProfissional) {
        try {
            const response = await fetch(`v1/profissionais/${deletarProfissional}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Erro na exclusão: ${response.statusText}`);
            }

            this.setState({ mensagemRetorno: 'Profissional excluido com sucesso!' });
            await this.buscarProfissionais();
        } catch (error) {
            alert("Não foi possível carregar os profissionais.");
        }
    }
}
