import './Footer.scss'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container fgrid">
        <div>
          <div className="row" style={{gap:10}}>
            <img src="/logo.svg" width="28" height="28" alt="" />
            <strong>OrbitalShop</strong>
          </div>
          <p className="small" style={{marginTop:8}}>Красивый темплейт магазина для MVP. Без бэкенда — всё на мок‑данных.</p>
        </div>
        <div className="links">
          <a href="#">Политика</a>
          <a href="#">Условия</a>
          <a href="#">Контакты</a>
        </div>
      </div>
    </footer>
  )
}
