import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice.js'
import { fetchProducts } from '../features/products/productThunks.js'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function ProductListing() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const cartItems = useSelector((state) => state.cart.items)

  if (status === 'loading' && items.length === 0) {
    return <div className="catalog-state" role="status"><span className="loader" /> Curating the collection...</div>
  }

  if (status === 'failed' && items.length === 0) {
    return (
      <div className="catalog-state catalog-error" role="alert">
        <p>We couldn’t reach the collection. {error}</p>
        <button className="outline-button" type="button" onClick={() => dispatch(fetchProducts())}>Try again</button>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {items.map((product, index) => {
        const inCart = cartItems.find((item) => item.id === product.id)?.quantity ?? 0
        return (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <span className="product-index">0{index + 1}</span>
              <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
              <button
                className={`quick-add${inCart ? ' added' : ''}`}
                type="button"
                aria-label={`Add ${product.title} to cart`}
                title={inCart ? `${inCart} in bag, add one more` : 'Add to bag'}
                onClick={() => dispatch(addToCart(product))}
              >
                <span aria-hidden="true">{inCart ? `+${inCart}` : '+'}</span>
              </button>
            </div>
            <div className="product-meta">
              <div>
                <p className="product-category">{product.category}</p>
                <h3>{product.title}</h3>
              </div>
              <span className="product-price">{currency.format(product.price)}</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}