import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutPDV } from '../../redux/actions/pdv';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';

import './styles.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutPDV());
    sessionStorage.removeItem('login');
  };

  const onClickLink = (e) => {
    setIsOpen(false);
    document.querySelectorAll('a').forEach((el) => {
      el.classList.remove('nav-link__active');
    });
    e.currentTarget.classList.add('nav-link__active');
  };

  useEffect(() => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('click', onClickLink);
    });
  }, []);

  return (
    <Navbar expand='md' fixed='top' dark>
      <Link to='/'>
        <img
          src='/assets/images/logo.jpg'
          alt='DéjàVu Boutique'
          className='logo-header'
        />
      </Link>

      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <Link to='/clientes/' className={`nav-link`}>
              Clientes
            </Link>
          </NavItem>
          <NavItem>
            <Link to='/produtos/' className='nav-link'>
              Produtos
            </Link>
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag='a' className='nav-link' caret>
              Relatórios
            </DropdownToggle>
            <DropdownMenu>
              <Link to='/relatorioVendas/' className='dropdown-item'>
                Relatório Vendas
              </Link>
              <Link to='/relatorioProdutos/' className='dropdown-item'>
                Relatório Produtos
              </Link>
              <Link to='/relatorioDevedores/' className='dropdown-item'>
                Relatório Devedores
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <Link to='/pdv/' className='nav-link'>
              PDV
            </Link>
          </NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag='a' className='nav-link' caret>
              Sistema
            </DropdownToggle>
            <DropdownMenu>
              <Link
                to='/back/'
                className='
                dropdown-item'>
                Backup
              </Link>
              <Link to='/fechamentoCaixa/' className='dropdown-item'>
                Fechamento de Caixa
              </Link>
              <Link
                to='/segundaViaCupom/'
                className='
                dropdown-item'>
                Segunda Via Cupom
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink onClick={logout}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
