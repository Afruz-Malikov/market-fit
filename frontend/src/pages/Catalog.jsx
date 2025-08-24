import { useMemo, useState } from 'react'
import data from '../data/products.json'
import ProductCard from '../components/ProductCard.jsx'
import FilterBar from '../components/FilterBar.jsx'

export default function Catalog(){
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const categories = useMemo(()=>Array.from(new Set(data.map(p=>p.category))), [])

  const filtered = data.filter(p => {
    const bySearch = q ? (p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase())) : true
    const byCat = cat ? p.category === cat : true
    const byMin = min ? p.price >= Number(min) : true
    const byMax = max ? p.price <= Number(max) : true
    return bySearch && byCat && byMin && byMax
  })

  return (
    <section>
      <div className="container">
        <h1 className="title-md">Каталог</h1>
        <p className="subtitle">Всего товаров: {filtered.length}</p>
        <FilterBar q={q} setQ={setQ} cat={cat} setCat={setCat} min={min} setMin={setMin} max={max} setMax={setMax} categories={categories} />
        <div className="grid">
          {filtered.map(item => <ProductCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}
