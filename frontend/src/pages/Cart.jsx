import { useEffect, useState } from 'react'

export default function Cart(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    setItems(cart)
  }, [])

  const update = (id, delta) => {
    const next = items.map(i => i.id===id ? {...i, qty: Math.max(1, i.qty+delta)} : i)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const removeItem = id => {
    const next = items.filter(i => i.id!==id)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const total = items.reduce((s,i)=>s+i.price*i.qty,0)

  return (
    <section className="container">
      <h1 className="title-md">Корзина</h1>
      {!items.length && <p className="subtitle">Корзина пуста</p>}
      <div className="grid" style={{gridTemplateColumns:'1fr', gap:12}}>
        {items.map(i => (
          <div key={i.id} className="card" style={{display:'grid', gridTemplateColumns:'80px 1fr auto', gap:14, alignItems:'center', padding:12}}>
            <img src={i.image} alt="" style={{width:80, height:80, objectFit:'cover', borderRadius:12}}/>
            <div>
              <strong>{i.title}</strong>
              <div className="small">{i.category}</div>
            </div>
            <div style={{display:'grid', gap:8, justifyItems:'end'}}>
              <div className="small">${i.price.toFixed(2)} × {i.qty}</div>
              <div className="row">
                <button className="btn ghost" onClick={()=>update(i.id,-1)}>-</button>
                <button className="btn ghost" onClick={()=>update(i.id, 1)}>+</button>
                <button className="btn ghost" onClick={()=>removeItem(i.id)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!!items.length && (
        <div className="card" style={{marginTop:16, padding:16, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <strong>Итого:</strong>
          <div className="price">${total.toFixed(2)}</div>
        </div>
      )}
    </section>
  )
}
