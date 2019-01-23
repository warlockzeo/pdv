import React, {Component} from 'react';
import {Button, Col} from 'reactstrap';

export default class RelatorioBarra extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    
    hoje(){
        const hoje = new Date();
        const dia = (hoje.getDate()<10)?`0${hoje.getDate()}`:hoje.getDate();
        const mes = (hoje.getMonth()<9)?`0${hoje.getMonth()+1}`:hoje.getMonth()+1;
        const ano = hoje.getFullYear();
        const dataHoje=`${ano}-${mes}-${dia}`;
        this.setState({datai:dataHoje});
        return dataHoje;
    }

    mudaDatai = (e) =>{
        this.props.mudaDatai(e.currentTarget.value);
    }

    mudaDataf = (e) =>{
        this.props.mudaDataf(e.currentTarget.value);
    }

    diario = () => {
        document.querySelector('#datai').value = this.hoje();
        document.querySelector('#dataf').value = this.hoje();
        this.props.mudaDatai(this.hoje());
        this.props.mudaDataf('');
    }

    semanal = () => {
        const hoje = new Date();
        const dia = (hoje.getDate()<10)?`0${hoje.getDate()}`:hoje.getDate();
        const diaDaSemana = hoje.getDay();
        const mes = (hoje.getMonth()<9)?`0${hoje.getMonth()+1}`:hoje.getMonth()+1;
        const ano = hoje.getFullYear();

        const domingo = dia - diaDaSemana;
        const sabado = dia + (6 - diaDaSemana);

        document.querySelector('#datai').value = `${ano}-${mes}-${domingo}`;
        document.querySelector('#dataf').value = `${ano}-${mes}-${sabado}`;
        this.props.mudaDatai(`${ano}-${mes}-${domingo}`);
        this.props.mudaDataf(`${ano}-${mes}-${sabado}`); 

    }

    mensal = () => {
        const hoje = new Date();
        const mes = (hoje.getMonth()<9)?`0${hoje.getMonth()+1}`:hoje.getMonth()+1;
        const ano = hoje.getFullYear();
        const ultimoDia = (new Date(ano, mes, 0)).getDate();
            
        document.querySelector('#datai').value = `${ano}-${mes}-01`;
        document.querySelector('#dataf').value = `${ano}-${mes}-${ultimoDia}`;
        this.props.mudaDatai(`${ano}-${mes}-01`);
        this.props.mudaDataf(`${ano}-${mes}-${ultimoDia}`); 
    }

    componentDidMount(){
        this.props.mudaDatai(this.hoje());
    }

    render() {
        return(
            <div className='relat-bar'>
                <Col md={3} className='relat-data'><input type='date' id='datai' className='form-control' onChange={this.mudaDatai} defaultValue={this.state.datai} /></Col>
                <Col md={3} className='relat-data'><input type='date' id='dataf' className='form-control' onChange={this.mudaDataf} defaultValue={this.state.datai} /></Col>
                <Col md={2} className='relat-button'><Button color='primary' className='form-control' onClick={this.diario}>Diário</Button></Col>
                <Col md={2} className='relat-button'><Button color='success' className='form-control' onClick={this.semanal}>Semanal</Button></Col>
                <Col md={2} className='relat-button'><Button color='warning' className='form-control' onClick={this.mensal}>Mensal</Button></Col>
            </div>
        );
    }
}