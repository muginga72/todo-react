// src/components/Header.jsx
import logo from '../assets/header.jpg';

function Header() {
  return (
    <header>
      <img src={logo} alt="Logo" style={{ height: '60px' }} />
    </header>
  );
}

export default Header;