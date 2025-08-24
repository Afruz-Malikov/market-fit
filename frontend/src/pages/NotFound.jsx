import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <section className="container" style={{textAlign:'center'}}>
      <h1 className="title-xl">404</h1>
      <p className="subtitle">Страница не найдена</p>
      <Link className="btn" to="/">На главную</Link>
    </section>
  )
}
