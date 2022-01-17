import React, { Component } from 'react';
import './styles.css';
export default class FormPagar extends Component {
  pagar = () => {
    this.props.atualizaSaldo({
      valor: document.querySelector('#valor').value,
      cliente: this.props.cliente
    });
  };

  render() {
    // let nome, saldo, id;
    // if(this.props.cliente){
    //     nome = this.props.cliente.nome;
    //     saldo = this.props.cliente.saldo;
    //     id = this.props.cliente.id;
    // }

    const { nome, saldo, id } = this.props.cliente;

    return (
      <div className='modal' id='modalPagarForm'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              Pagamento
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <form className='modalForm__form'>
                <div className='col-md-12 modalForm__nome'>
                  <span>Nome: {nome}</span>
                  <br />
                  <span>Saldo atual: {saldo}</span>
                  <br />
                  <label>Valor:</label>
                  <input
                    className='form-control'
                    type='text'
                    id='valor'
                    defaultValue='0,00'
                  />
                </div>
                <input type='hidden' id='id' defaultValue={id} />
              </form>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-dismiss='modal'
                onClick={this.pagar}>
                Pagar
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
                onClick={this.onClickFechar}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
