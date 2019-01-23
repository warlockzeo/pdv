import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import './styles.css';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/"><img src="/assets/images/logo.jpg" alt="DéjàVi Boutique" className="logo-header" /></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/clientes/">Clientes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/produtos/">Produtos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/relatorioVendas/">Relatório Vendas</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/relatorioProdutos/">Relatório Produtos</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/pdv/">PDV</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
        
export default Header;