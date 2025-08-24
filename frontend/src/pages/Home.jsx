import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="container">
      <div className="card" style={{overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.1fr .9fr', alignItems:'center'}}>
          <div style={{padding:'40px 32px 48px'}}>
            {/* <p className="badge">👋 Добро пожаловать</p> */}
            <h1 className="title-xl">MarketFit - Магазин будущего </h1>
            <p className="subtitle">Место где ты сможешь примерить все, даже не выходя из дома</p>
            <div className="row" style={{marginTop:18}}>
              <Link className="btn" to="/catalog">Перейти в каталог</Link>
            </div>
          </div>
          <div style={{minHeight:320, background:'radial-gradient(500px 300px at 60% -10%, rgba(var(--ring), .25), transparent), linear-gradient(180deg, rgba(255,255,255,.06), transparent)'}}>
            <img src="/images/p1.svg" alt="" style={{width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'lighten'}}/>
          </div>
        </div>
      </div>

      <div style={{marginTop:28}}>
        <h2 className="title-md">Популярные категории</h2>
        <p className="subtitle">Быстрые ссылки на подборки товаров</p>
        <div className="grid" style={{marginTop:14}}>
          {[
            {t:'Футболки', img:'/images/p2.svg'},
            {t:'Худи', img:'/images/p3.svg'},
            {t:'Куртки', img:'/images/p4.svg'},
            {t:'Платья', img:'/images/p5.svg'},
          ].map((c,i)=>(
            <div className="card" key={i} style={{overflow:'hidden'}}>
              <img src={c.img} alt="" />
              <div style={{padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <strong>{c.t}</strong>
                <Link className="btn ghost" to="/catalog">Смотреть</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
