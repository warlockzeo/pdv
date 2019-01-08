import React, {Component} from 'react';
import './styles.css';
class FormProdutos extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.id || '',
            codBarra: this.props.codBarra || '',
            descr:this.props.descr || '',
            preco:this.props.preco || '',
            estoque:this.props.estoque || '',
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
            codBarra: document.getElementById('codBarra').value,
            descr: document.getElementById('descr').value,
            preco: document.getElementById('preco').value,
            estoque: document.getElementById('estoque').value,
        });
    }

    render(){
        const titulo = (this.props.titulo)?<h4 className='modal-title'>{this.props.titulo}</h4>:'';
        
        const {id, codBarra, descr} = this.props.dados || '';
        const estoque = (this.props.dados)?this.props.dados.estoque:'0';
        const preco = (this.props.dados)?this.props.dados.preco:'0';

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
                                <div className='col-md-12 modalForm__codBarra'>
                                    <label>Cód de Barras:</label>
                                    <input className='form-control' type='text' id='codBarra' placeholder='Cód de Barras' defaultValue={codBarra}  onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-12 modalForm__descr'>
                                    <label>Descrição:</label>
                                    <input className='form-control' type='text' id='descr' placeholder='Descrição' defaultValue={descr} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-6 modalForm__estoque'>
                                    <label>Estoque:</label>
                                    <input className='form-control' type='text' id='estoque' placeholder='Estoque' defaultValue={estoque} onChange={this.onChangeInput} />
                                </div>
                                <div className='col-md-6 modalForm__preco'>
                                    <label>Preço:</label>
                                    <input className='form-control' type='text' id='preco' placeholder='Preço' defaultValue={preco} onChange={this.onChangeInput} />
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

export default FormProdutos;