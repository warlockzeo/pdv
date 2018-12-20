import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './styles.css';

const products = [{
        id: 1,
        name: "Jonathan",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 2,
        name: "Joana",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 3,
        name: "Sansão",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }, {
        id: 4,
        name: "Maria",
        endereco: "Rua jose alves dias, 23",
        bairro: "Brasília",
        fone: "99982-3437"
    }, {
        id: 5,
        name: "Cida",
        endereco: "Rua jose alves dias, 23",
        bairro: "Centro",
        fone: "99982-3437"
    }];


    const selectRowProp = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#f7bbf5'
    };

    function onAfterInsertRow(row) {
        let newRowStr = '';
        
        for (const prop in row) {
          newRowStr += prop + ': ' + row[prop] + ' \n';
        }
        //alert('The new row is:\n ' + newRowStr);
    }
    
    function onAfterDeleteRow(rowKeys) {
        
    }

    function afterSearch(searchText, result) {

    }

    const options = {
        afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
        afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
        afterSearch: afterSearch,  // define a after search hook
    };
      
class TelaClientes extends Component {
    state = {
        clientes :[]
    };

    render(){

        return (
            <div className="tela-clientes">

                <div className="lista-clientes container">
                    <BootstrapTable data={products} insertRow={ true } deleteRow={ true } search={ true } striped selectRow={ selectRowProp } options={ options } version='4'>
                        <TableHeaderColumn dataField='name' isKey>Nome</TableHeaderColumn>
                        <TableHeaderColumn dataField='endereco'>Endereço</TableHeaderColumn>
                        <TableHeaderColumn dataField='bairro'>Bairro</TableHeaderColumn>
                        <TableHeaderColumn dataField='fone'>Telefone</TableHeaderColumn>
                        <TableHeaderColumn dataField='saldo'>Saldo</TableHeaderColumn>
                    </BootstrapTable>
                </div>

            </div>
        );
    };
}
    
export default TelaClientes;