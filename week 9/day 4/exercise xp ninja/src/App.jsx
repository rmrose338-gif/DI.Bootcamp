import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthForm from './components/AuthForm.jsx'
import ProductListing from './components/ProductListing.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import { selectCartCount } from './features/cart/cartSlice.js'
import { fetchProducts } from './features/products/productThunks.js'

function App() {
  const dispatch = useDispatch()
  const productStatus = useSelector((state) => state.products.status)
  const cartCount = useSelector(selectCartCount)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <main className="storefront">
      <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $75 <span aria-hidden="true">✳</span> DESIGNED FOR EVERYDAY</div>

      <header className="masthead">
        <a className="brand" href="#home" aria-label="Fieldwork Supply home">
          <span className="brand-symbol" aria-hidden="true">F<span>.</span></span>
          <span>FIELDWORK<br />SUPPLY</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="#collection">Shop all</a>
          <a href="#collection">Objects</a>
          <a href="#collection">Our approach</a>
        </nav>
        <div className="header-actions">
          <AuthForm />
          <a className="bag-link" href="#bag" aria-label={`Shopping bag with ${cartCount} items`}>
            <span className="bag-icon" aria-hidden="true">□</span>
            <span>Bag</span>
            <span className="bag-count">{cartCount}</span>
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> THE EVERYDAY EDITION <span className="hero-number">Nº 04 — 2026</span></p>
          <h1>Useful things.<br /><em>Beautifully</em> done.</h1>
          <div className="hero-bottom">
            <p>Considered essentials for the spaces<br className="desktop-break" /> we live, work, and wind down in.</p>
            <a href="#collection" className="hero-link">Explore the collection <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="A still life of everyday objects in a sunlit studio">
          <div className="art-sun" />
          <div className="art-table" />
          <div className="art-vase"><span /></div>
          <div className="art-book art-book-back" />
          <div className="art-book art-book-front" />
          <div className="art-caption">FORM FOLLOWS FEELING <span>01 / 04</span></div>
        </div>
      </section>

      <section className="shop-layout" id="collection">
        <div className="catalog-column">
          <div className="collection-heading">
            <div>
              <p className="section-kicker">THE CURRENT COLLECTION</p>
              <h2>Objects for living</h2>
            </div>
            <span className="collection-count">{productStatus === 'succeeded' ? '01 — 08' : 'LOADING'}</span>
          </div>
          <ProductListing />
        </div>
        <div id="bag"><ShoppingCart /></div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">FIELDWORK SUPPLY</a>
        <span>GOOD DESIGN, EVERY DAY.</span>
        <span>© 2026 FIELDWORK</span>
      </footer>
    </main>
  )
}

export default App