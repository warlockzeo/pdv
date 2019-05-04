import React, {Component} from 'react';
import './styles.css';

const hoje = new Date();
const dia = (hoje.getDate()<10)?`0${hoje.getDate()}`:hoje.getDate();
const mes = (hoje.getMonth()<9)?`0${hoje.getMonth()+1}`:hoje.getMonth()+1;
const ano = hoje.getFullYear();
const dataHoje=`${ano}-${mes}-${dia}`;

class FormClientes extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.id || '',
            nome: this.props.nome || '',
            endereco:this.props.endereco || '',
            fone:this.props.fone || '',
            cpf:this.props.cpf || '',
            rg:this.props.rg || '',
            saldo:this.props.saldo || 0,
            complemento:this.props.complemento || '',
            dataSaldo:this.props.dataSaldo || dataHoje,
            typeForm:''
        }
    }

    onClickGravar = async () => {
        await this.props.callbackParent(this.state);
        document.querySelector('form').reset();
    }

    onClickFechar = async () => {
        await document.querySelector('form').reset();
    }

    onChangeInput = () => {
        this.setState({
            id:document.getElementById('id').value,
            nome: document.getElementById('nome').value,
            endereco: document.getElementById('endereco').value,
            cpf: document.getElementById('cpf').value,
            rg: document.getElementById('rg').value,
            fone: document.getElementById('fone').value,
            saldo: document.getElementById('saldo').value,
            dataSaldo: document.getElementById('dataSaldo').value,
            complemento: document.getElementById('complemento').value
        });
    }

    render(){
        const titulo = (this.props.titulo)?<h4 className='modal-title'>{this.props.titulo}</h4>:'';
        
        const {id, nome, endereco, fone, cpf, rg, complemento} = this.props.dados || '';
        
        const dataSaldo = (this.props.dados)?(
            (this.props.dados.dataSaldo!==null)?this.props.dados.dataSaldo:dataHoje
        ):(dataHoje);

        const saldo = (this.props.dados)?this.props.dados.saldo:'0';

        let gravar;
        if(this.props.typeForm==='novo'){
            gravar = <button type='button' className='btn btn-success' data-dismiss='modal' onClick={this.onClickGravar}>Gravar</button>
        } else if(this.props.typeForm==='update'){
            gravar = <button type='button' className='btn btn-success' data-dismiss='modal' onClick={this.onClickGravar}>Atualizar</button>
        } else {
            gravar = '' ;
        }

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
                                    <input className='form-control' type='text' id='nome' placeholder='Nome completo' defaultValue={nome}  onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-12 modalForm__endereco'>
                                    <label>Endereço:</label>
                                    <input className='form-control' type='text' id='endereco' placeholder='Endereço' defaultValue={endereco} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-4 modalForm__cpf'>
                                    <label>CPF:</label>
                                    <input className='form-control' type='text' id='cpf' placeholder='CPF' defaultValue={cpf} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-4 modalForm__rg'>
                                    <label>RG:</label>
                                    <input className='form-control' type='text' id='rg' placeholder='RG' defaultValue={rg} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-4 modalForm__fone'>
                                    <label>Telefone:</label>
                                    <input className='form-control' type='text' id='fone' placeholder='Telefone' defaultValue={fone} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-6 modalForm__saldo'>
                                    <label>Saldo:</label>
                                    <input className='form-control input-saldo' type='text' id='saldo' placeholder='Saldo' defaultValue={saldo} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-6 modalForm__dataSaldo'>
                                    <label>Data do Saldo:</label>
                                    <input className='form-control input-dataSaldo' type='date' id='dataSaldo' placeholder='Data do Saldo' defaultValue={dataSaldo} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-12 modalForm__complemento'>
                                    <label>Complemento:</label>
                                    <input className='form-control input-complemento' type='text' id='complemento' placeholder='Complemento' defaultValue={complemento} onChange={this.onChangeInput} />
                                </div>
                                <input type='hidden' id='id' defaultValue={id} />
                            </form>
                        </div>

                        <div className='modal-footer'>
                            {gravar}
                            <button type='button' className='btn btn-danger' data-dismiss='modal' onClick={this.onClickFechar}>Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default FormClientes;