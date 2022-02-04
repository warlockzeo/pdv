import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutPDV } from '../../redux/actions/pdv';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';

import { Header as S } from './styles';

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
    <S.wrap>
      <Navbar expand='md' fixed='top' dark>
        <Link to='/'>
          <S.logo src='/assets/images/logo.jpg' alt='DéjàVu Boutique' />
        </Link>

        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <Link to='/clientes/' className={`nav-link`}>
              Clientes
            </Link>

            <Link to='/produtos/' className='nav-link'>
              Produtos
            </Link>

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

            <Link to='/pdv/' className='nav-link'>
              PDV
            </Link>

            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle tag='a' className='nav-link' caret>
                Sistema
              </DropdownToggle>
              <DropdownMenu>
                <Link to='/back/' className='dropdown-item'>
                  Backup
                </Link>
                <Link to='/fechamentoCaixa/' className='dropdown-item'>
                  Fechamento de Caixa
                </Link>
                <Link to='/segundaViaCupom/' className='dropdown-item'>
                  Segunda Via Cupom
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavLink onClick={logout}>Logout</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </S.wrap>
  );
};

export default Header;
