import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem
} from 'reactstrap';

import './styles.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md" fixed="top">
      <NavbarBrand href="/">
        <img
          src="/assets/images/logo.jpg"
          alt="DéjàVu Boutique"
          className="logo-header"
        />
      </NavbarBrand>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/clientes/">Clientes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/produtos/">Produtos</NavLink>
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag="a" className="nav-link" caret>
              Relatórios
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" href="/relatorioVendas/">
                Relatório Vendas
              </DropdownItem>
              <DropdownItem tag="a" href="/relatorioProdutos/">
                Relatório Produtos
              </DropdownItem>
              <DropdownItem tag="a" href="/relatorioDevedores/">
                Relatório Devedores
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="/pdv/">PDV</NavLink>
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag="a" className="nav-link" caret>
              Sistema
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" href="/back/">
                Backup
              </DropdownItem>
              <DropdownItem tag="a" href="/fechamentoCaixa/">
                Fechamento de Caixa
              </DropdownItem>
              <DropdownItem tag="a" href="/segundaViaCupom/">
                Segunda Via Cupom
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
