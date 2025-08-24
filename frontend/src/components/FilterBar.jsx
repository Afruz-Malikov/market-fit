import './FilterBar.scss'

export default function FilterBar({ q, setQ, cat, setCat, min, setMin, max, setMax, categories }){
  return (
    <div className="filter card">
      <div className="row" style={{flexWrap:'wrap'}}>
        <input className="input" style={{flex: '1 1 240px'}} placeholder="Поиск..."
               value={q} onChange={e=>setQ(e.target.value)} />
        <select className="input" style={{flex: '1 1 160px', maxWidth:240}} value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="">Все категории</option>
          {categories.map(c=>(<option key={c} value={c}>{c}</option>))}
        </select>
        <input className="input" style={{width:140}} type="number" placeholder="Мин $" value={min}
               onChange={e=>setMin(e.target.value)} />
        <input className="input" style={{width:140}} type="number" placeholder="Макс $" value={max}
               onChange={e=>setMax(e.target.value)} />
      </div>
    </div>
  )
}
