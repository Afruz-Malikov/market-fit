import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="container bar">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="" />
          <span>
            Market<span className="brand">Fit</span>
          </span>
        </Link>

        <nav className="nav">
          <NavLink to="/" end>
            Главная
          </NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/cart">Корзина</NavLink>
        </nav>

        <Link className="btn ghost" to="/cart">
          🛒 Корзина
        </Link>
      </div>
    </header>
  );
}
