import React, {Component} from 'react';
import './styles.css';
class FormClientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cliente:{}
        };
    };

    render(){
        const decimais = (numero) => numero.toFixed(2).replace('.',',');

        const cliente = this.props.dados;
        const nome = (this.props.dados)?cliente.nome:'';
        const endereco = (this.props.dados)?cliente.endereco:'';
        const fone = (this.props.dados)?cliente.fone:'';
        const cpf = (this.props.dados)?cliente.cpf:'';
        const rg = (this.props.dados)?cliente.rg:'';
        const saldo = (this.props.dados)?decimais(cliente.saldo):'';

        let titulo = '';
        if(this.props.titulo){
            titulo = <h4 className='modal-title'>{this.props.titulo}</h4>
        };

        let gravar = '';
        if(!this.props.dados){
            gravar = <button type='button' className='btn btn-success' data-dismiss='modal'>Gravar</button>;
        };

        return(
            <div className='modal' id='modalForm'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {titulo}
                            <button type='button' className='close' data-dismiss='modal'>&times;</button>
                        </div>
                        <div className='modal-body'>
                            <form className='modalForm__form'>
                                <div className='col-md-12 modalForm__nome'>
                                    <label>Nome Completo:</label>
                                    <input className='form-control' type='text' id='nomeCompleto' placeholder='Nome completo' defaultValue={nome} />
                                </div>
                                <div className='col-md-12 modalForm__endereco'>
                                    <label>Endereço:</label>
                                    <input className='form-control' type='text' id='endereco' placeholder='Endereço' defaultValue={endereco} />
                                </div>
                                <div className='col-md-6 modalForm__cpf'>
                                    <label>CPF:</label>
                                    <input className='form-control' type='text' id='cpf' placeholder='CPF' defaultValue={cpf} />
                                </div>
                                <div className='col-md-6 modalForm__rg'>
                                    <label>RG:</label>
                                    <input className='form-control' type='text' id='rg' placeholder='RG' defaultValue={rg} />
                                </div>
                                <div className='col-md-6 modalForm__fone'>
                                    <label>Telefone:</label>
                                    <input className='form-control' type='text' id='fone' placeholder='Telefone' defaultValue={fone} /></div>
                                <div className='col-md-6 modalForm__saldo'>
                                    <label>Saldo:</label>
                                    <input className='form-control input-saldo' type='text' id='saldo' placeholder='Saldo' defaultValue={saldo} />
                                </div>
                            </form>
                        </div>

                        <div className='modal-footer'>
                            {gravar}
                            <button type='button' className='btn btn-danger' data-dismiss='modal'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default FormClientes;