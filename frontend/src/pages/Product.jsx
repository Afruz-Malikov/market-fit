import { useParams, Link } from 'react-router-dom';
import data from '../data/products.json';

export default function Product() {
  const { id } = useParams();
  const item = data.find((p) => String(p.id) === String(id));
  if (!item)
    return (
      <div className="container">
        <p>Товар не найден</p>
      </div>
    );

  return (
    <section className="container">
      <div
        className="card"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          overflow: 'hidden',
        }}
      >
        <div style={{ background: 'var(--bg-soft)', padding: 12 }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ padding: '16px 16px 20px' }}>
          <p className="badge">{item.category}</p>
          <h1 className="title-md" style={{ marginTop: 10 }}>
            {item.title}
          </h1>
          <p className="subtitle" style={{ marginTop: 6 }}>
            {item.description}
          </p>
          <div className="separator"></div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div className="price">${item.price.toFixed(2)}</div>
            <div className="small">В наличии: {item.stock}</div>
          </div>
          <div className="row" style={{ marginTop: 16, gap: 10 }}>
            <button
              className="btn"
              onClick={() => {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const idx = cart.findIndex((p) => p.id === item.id);
                if (idx >= 0) cart[idx].qty += 1;
                else cart.push({ ...item, qty: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Добавлено в корзину');
              }}
            >
              Добавить в корзину
            </button>
            <Link className="btn ghost" to="/catalog">
              Назад в каталог
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
