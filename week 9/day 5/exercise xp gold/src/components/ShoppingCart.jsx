import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../redux/shoppingCartSlice.js'
import { calculateTotalPrice, selectCartItems, selectProducts } from '../redux/selectors.js'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function ShoppingCart() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const cartItems = useSelector(selectCartItems)
  const totalPrice = useSelector(calculateTotalPrice)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleAddToCart = useCallback((productId) => {
    dispatch(addToCart(productId))
  }, [dispatch])

  const handleRemoveFromCart = useCallback((productId) => {
    dispatch(removeFromCart(productId))
  }, [dispatch])

  return (
    <main className="shop-shell">
      <header className="topbar">
        <a className="wordmark" href="#shop" aria-label="Common Goods home">
          <span className="wordmark-icon" aria-hidden="true">c.</span>
          <span>COMMON GOODS</span>
        </a>
        <span className="topbar-note">USEFUL THINGS, MADE THOUGHTFULLY</span>
        <a className="cart-link" href="#cart" aria-label={`Shopping bag, ${itemCount} items`}>
          BAG <span>{String(itemCount).padStart(2, '0')}</span>
        </a>
      </header>

      <section className="shop-heading" id="shop">
        <div>
          <p className="eyebrow"><span /> THE EVERYDAY EDITION <span className="eyebrow-divider">/</span> OBJECTS FOR LIVING</p>
          <h1>A good thing,<br /><em>well chosen.</em></h1>
        </div>
        <p className="heading-note">Small comforts for the daily ritual.<br />Made with care, kept for years.</p>
      </section>

      <div className="shop-layout">
        <section className="products-section" aria-labelledby="products-title">
          <div className="section-heading">
            <h2 id="products-title">Shop the collection</h2>
            <span>{String(products.length).padStart(2, '0')} OBJECTS</span>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article className="product" key={product.id}>
                <div className={`product-image image-${product.color}`}>
                  <img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} />
                  <span className="product-index">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.detail}</p>
                  </div>
                  <span className="product-price">{currency.format(product.price)}</span>
                </div>
                <button className="add-button" type="button" onClick={() => handleAddToCart(product.id)}>
                  <span>Add to bag</span><span aria-hidden="true">+</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
          <div className="cart-panel-heading">
            <div>
              <p className="cart-kicker">YOUR SELECTION</p>
              <h2 id="cart-title">The bag <span>({itemCount})</span></h2>
            </div>
            <span className="bag-mark" aria-hidden="true">✳</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-mark" aria-hidden="true">＋</span>
              <p>Your bag is taking a quiet moment.</p>
              <span>Find something useful for it.</span>
            </div>
          ) : (
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>QTY {String(item.quantity).padStart(2, '0')} <span>·</span> {currency.format(item.price)}</p>
                    <button type="button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
                  <span className="cart-item-total">{currency.format(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-total">
            <span>SUBTOTAL</span>
            <strong>{currency.format(totalPrice)}</strong>
          </div>
          <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
          <button className="checkout-button" type="button" disabled={cartItems.length === 0}>
            <span>Continue to checkout</span><span aria-hidden="true">↗</span>
          </button>
          <p className="cart-footnote"><span aria-hidden="true">✓</span> Thoughtful goods, packed with care</p>
        </aside>
      </div>

      <footer className="page-footer">
        <span>COMMON GOODS <span>/</span> EST. 2026</span>
        <span>LESS, BUT BETTER.</span>
      </footer>
    </main>
  )
}

export default ShoppingCart