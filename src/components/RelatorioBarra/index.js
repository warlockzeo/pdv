import React, {Component} from 'react';
import moment from 'moment';
import {Button, Col} from 'reactstrap';

const dataHoje = moment().format('YYYY-MM-DD');

export default class RelatorioBarra extends Component {
    
    state = {
        datai:dataHoje,
        dataf:dataHoje
    };

    mudaDatai = (e) =>{
        this.setState({
            datai:e.currentTarget.value
        });
        this.props.mudaDatai(e.currentTarget.value);
    }

    mudaDataf = (e) =>{
        this.setState({
            dataf:e.currentTarget.value
        });
        this.props.mudaDataf(e.currentTarget.value);
    }

    diario = () => {
        this.setState({
            datai:dataHoje,
            dataf:dataHoje
        });
        this.props.mudaDatai(dataHoje);
        this.props.mudaDataf('');
    }

    semanal = () => {
        const domingo = moment().startOf('week').format('YYYY-MM-DD');
        const sabado = moment().endOf('week').format('YYYY-MM-DD');
        this.setState({
            datai:domingo,
            dataf:sabado
        });

        this.props.mudaDatai(domingo);
        this.props.mudaDataf(sabado); 
    }

    mensal = () => {
        const inicioMes = moment().format('YYYY-MM-01');
        const fimMes = moment().endOf('month').format('YYYY-MM-DD');
        this.setState({
            datai:inicioMes,
            dataf:fimMes
        });

        this.props.mudaDatai(inicioMes);
        this.props.mudaDataf(fimMes); 
    }

    componentDidMount(){
        this.props.mudaDatai(dataHoje);
    }

    render() {
        return(
            <div className='relat-bar'>
                <Col md={3} className='relat-data'><input type='date' id='datai' className='form-control' onChange={this.mudaDatai} value={this.state.datai} /></Col>
                <Col md={3} className='relat-data'><input type='date' id='dataf' className='form-control' onChange={this.mudaDataf} value={this.state.dataf} /></Col>
                <Col md={2} className='relat-button'><Button color='primary' className='form-control' onClick={this.diario}>Diário</Button></Col>
                <Col md={2} className='relat-button'><Button color='success' className='form-control' onClick={this.semanal}>Semanal</Button></Col>
                <Col md={2} className='relat-button'><Button color='warning' className='form-control' onClick={this.mensal}>Mensal</Button></Col>
            </div>
        );
    }
}