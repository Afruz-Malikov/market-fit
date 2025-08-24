import { Link } from 'react-router-dom'
import './ProductCard.scss'

export default function ProductCard({ item }){
  return (
    <article className="product card">
      <Link to={`/product/${item.id}`} className="pic">
        <img src={item.image} loading="lazy" alt={item.title} />
        {item.badge && <span className="badge">{item.badge}</span>}
      </Link>
      <div className="body">
        <Link to={`/product/${item.id}`} className="title">{item.title}</Link>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div className="price">${item.price.toFixed(2)}</div>
          <button className="btn ghost" onClick={()=>{
            const cart = JSON.parse(localStorage.getItem('cart')||'[]');
            const idx = cart.findIndex(p=>p.id===item.id);
            if(idx>=0) cart[idx].qty+=1; else cart.push({...item, qty:1});
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Добавлено в корзину');
          }}>В корзину</button>
        </div>
      </div>
    </article>
  )
}
