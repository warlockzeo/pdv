import React, {Component, Fragment} from 'react';
import './styles.css';
class FormClientes extends Component {
    constructor(props){
        super(props);

        this.state = {
            nome: this.props.nome || '',
            endereco:this.props.endereco || '',
            fone:this.props.fone || '',
            cpf:this.props.cpf || '',
            rg:this.props.rg || '',
            saldo:this.props.saldo || 0
        }
    }

    limparState () {
        this.setState({
            nome: '',
            endereco:'',
            fone:'',
            cpf:'',
            rg:'',
            saldo:''
        });
    }

    onClickGravar = async () => {
        await this.props.callbackParent(this.state);
        this.limparState();
    }

    onClickFechar = async () => {
        await this.limparState();
    }

    onChangeNome = (e) =>  {
        this.setState({
            nome: e.currentTarget.value
        });
    }

    onChangeEndereco = (e) =>  {
        this.setState({
            endereco: e.currentTarget.value
        })
    }

    onChangeCpf = (e) =>  {
        this.setState({
            cpf: e.currentTarget.value
        })
    }

    onChangeRg = (e) =>  {
        this.setState({
            rg: e.currentTarget.value
        })
    }

    onChangeFone = (e) =>  {
        this.setState({
            fone: e.currentTarget.value
        })
    }

    onChangeSaldo = (e) =>  {
        this.setState({
            saldo: e.currentTarget.value
        })
    }

    render(){
        console.log(this.state.nome);

        const titulo = (this.props.titulo)?<h4 className='modal-title'>{this.props.titulo}</h4>:'';
        
        const {nome, endereco, fone, cpf, rg, saldo} = this.props.dados || '';
 
        const gravar = (this.props.dados)?'':<button type='button' className='btn btn-success' data-dismiss='modal' onClick={this.onClickGravar}>Gravar</button>;

        let formulario = '';

        if(this.props.typeForm==='novo'){
            formulario = 
            <Fragment>
                <div className='col-md-12 modalForm__nome'>
                    <label>Nome Completo:</label>
                    <input className='form-control' type='text' id='nomeCompleto' placeholder='Nome completo'  onChange={this.onChangeNome} />
                </div>
                <div className='col-md-12 modalForm__endereco'>
                    <label>Endereço:</label>
                    <input className='form-control' type='text' id='endereco' placeholder='Endereço'  onChange={this.onChangeEndereco} />
                </div>
                <div className='col-md-6 modalForm__cpf'>
                    <label>CPF:</label>
                    <input className='form-control' type='text' id='cpf' placeholder='CPF'  onChange={this.onChangeCpf} />
                </div>
                <div className='col-md-6 modalForm__rg'>
                    <label>RG:</label>
                    <input className='form-control' type='text' id='rg' placeholder='RG'  onChange={this.onChangeRg} />
                </div>
                <div className='col-md-6 modalForm__fone'>
                    <label>Telefone:</label>
                    <input className='form-control' type='text' id='fone' placeholder='Telefone'  onChange={this.onChangeFone} /></div>
                <div className='col-md-6 modalForm__saldo'>
                    <label>Saldo:</label>
                    <input className='form-control input-saldo' type='text' id='saldo' placeholder='Saldo' onChange={this.onChangeSaldo} />
                </div>
            </Fragment>
        } else if(this.props.typeForm==='view'){
            formulario = 
            <Fragment>
                <div className='col-md-12 modalForm__nome'>
                    <label>Nome Completo:</label>
                    <input className='form-control' type='text' id='nomeCompleto' placeholder='Nome completo' disabled defaultValue={this.props.dados.nome} />
                </div>
                <div className='col-md-12 modalForm__endereco'>
                    <label>Endereço:</label>
                    <input className='form-control' type='text' id='endereco' placeholder='Endereço' disabled defaultValue={endereco} />
                </div>
                <div className='col-md-6 modalForm__cpf'>
                    <label>CPF:</label>
                    <input className='form-control' type='text' id='cpf' placeholder='CPF' disabled defaultValue={cpf} />
                </div>
                <div className='col-md-6 modalForm__rg'>
                    <label>RG:</label>
                    <input className='form-control' type='text' id='rg' placeholder='RG' disabled defaultValue={rg} />
                </div>
                <div className='col-md-6 modalForm__fone'>
                    <label>Telefone:</label>
                    <input className='form-control' type='text' id='fone' placeholder='Telefone' disabled defaultValue={fone} /></div>
                <div className='col-md-6 modalForm__saldo'>
                    <label>Saldo:</label>
                    <input className='form-control input-saldo' type='text' id='saldo' placeholder='Saldo' disabled defaultValue={saldo} />
                </div>
            </Fragment>
        } else if(this.props.typeForm==='update'){
            formulario = 
            <Fragment>
                <div className='col-md-12 modalForm__nome'>
                    <label>Nome Completo:</label>
                    <input className='form-control' type='text' id='nomeCompleto' placeholder='Nome completo' defaultValue={nome} onChange={this.onChangeNome} />
                </div>
                <div className='col-md-12 modalForm__endereco'>
                    <label>Endereço:</label>
                    <input className='form-control' type='text' id='endereco' placeholder='Endereço' defaultValue={endereco} onChange={this.onChangeEndereco} />
                </div>
                <div className='col-md-6 modalForm__cpf'>
                    <label>CPF:</label>
                    <input className='form-control' type='text' id='cpf' placeholder='CPF' defaultValue={cpf} onChange={this.onChangeCpf} />
                </div>
                <div className='col-md-6 modalForm__rg'>
                    <label>RG:</label>
                    <input className='form-control' type='text' id='rg' placeholder='RG' defaultValue={rg} onChange={this.onChangeRg} />
                </div>
                <div className='col-md-6 modalForm__fone'>
                    <label>Telefone:</label>
                    <input className='form-control' type='text' id='fone' placeholder='Telefone' defaultValue={fone} onChange={this.onChangeFone} /></div>
                <div className='col-md-6 modalForm__saldo'>
                    <label>Saldo:</label>
                    <input className='form-control input-saldo' type='text' id='saldo' placeholder='Saldo' defaultValue={saldo} onChange={this.onChangeSaldo} />
                </div>
            </Fragment>
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
                                {formulario}
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