import React, {Component} from 'react';

class FormClientes extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render(){
        const cliente = this.props.dados
        const nome = (this.props.dados)?cliente.nome:'';
        return(
            <div className='modal' id='modalForm'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modal Heading</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input className='form-control' type='text' id='nomeCompleto' placeholder='Nome completo' defaultValue={nome} />
                                <input className='form-control' type='text' id='endereco' placeholder='Endereço' />
                                <input className='form-control' type='text' id='fone' placeholder='Telefone' />
                                <input className='form-control' type='text' id='cpf' placeholder='CPF' />
                                <input className='form-control' type='text' id='rg' placeholder='RG' />
                                <input className='form-control' type='text' id='saldo' placeholder='Saldo' />
                                <button className='form-control btn btn-success'>Gravar</button>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default FormClientes;