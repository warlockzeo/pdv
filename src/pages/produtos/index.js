import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import './styles.css';

const products = [{
        id: 1,
        descr: "Pulseira",
        estoque: 10,
        preco: 2.99
    }, {
        id: 2,
        descr: "Pulseira",
        estoque: 10,
        preco: 2.99
        }, {
        id: 3,
        descr: "Pulseira",
        estoque: 10,
        preco: 2.99
    }, {
        id: 4,
        descr: "Pulseira",
        estoque: 10,
        preco: 2.99
    }, {
        id: 5,
        descr: "Pulseira",
        estoque: 10,
        preco: 2.99
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
        //alert('The rowkey you drop: ' + rowKeys);
    }

    function afterSearch(searchText, result) {
        //console.log('Your search text is ' + searchText);
        //console.log('Result is:');
        //for (let i = 0; i < result.length; i++) {
            //console.log('Fruit: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
        //}
    }

    const options = {
        afterInsertRow: onAfterInsertRow,   // A hook for after insert rows
        afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
        afterSearch: afterSearch,  // define a after search hook
    };
      
class TelaProdutos extends Component {
    state = {
        produtos :[]
    };

    render(){

        return (
            <div className="tela-produtos">

                <div className="lista-clientes container">
                    <BootstrapTable data={products} insertRow={ true } deleteRow={ true } search={ true } striped selectRow={ selectRowProp } options={ options }>
                        <TableHeaderColumn dataField='descr' isKey>Descrição</TableHeaderColumn>
                        <TableHeaderColumn dataField='estoque'>Estoque</TableHeaderColumn>
                        <TableHeaderColumn dataField='preco'>Preço</TableHeaderColumn>
                    </BootstrapTable>
                </div>

            </div>
        );
    };
}
    
export default TelaProdutos;