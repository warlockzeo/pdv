import styled from 'styled-components';

export const Header = {
  wrap: styled.div`
    .navbar {
      background-color: #000 !important;
    }

    .nav-link {
      color: #ff00f7 !important;
      cursor: pointer;
    }

    .nav-link:hover,
    .nav-link__active {
      color: #fff !important;
    }

    .dropdown-item:hover {
      background-color: #ff00f7 !important;
      color: #fff !important;
    }

    @media only screen and (max-width: 767px) {
      .navbar-dark .navbar-toggler {
        border-color: #ff00f7;
      }
    }
  `,

  logo: styled.img`
    width: auto;
    height: 40px;
  `
};
