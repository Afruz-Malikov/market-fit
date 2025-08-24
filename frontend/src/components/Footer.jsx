import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container fgrid">
        <div>
          <div className="row" style={{ gap: 10 }}>
            <img src="/logo.svg" width="28" height="28" alt="" />
            <strong>MarketFit</strong>
          </div>
        </div>
        <div className="links">
          <a href="#">Политика</a>
          <a href="#">Условия</a>
          <a href="#">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
