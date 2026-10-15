import { useDispatch, useSelector } from 'react-redux'
import { changeQuantity, clearCart, removeFromCart, selectCartSubtotal } from '../features/cart/cartSlice.js'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const SHIPPING_THRESHOLD = 75
const SHIPPING_COST = 6

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const subtotal = useSelector(selectCartSubtotal)
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const [checkoutComplete, setCheckoutComplete] = [null, () => {}]

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <p className="section-kicker">YOUR SELECTION</p>
          <h2 id="cart-title">The bag<span className="cart-count">{items.reduce((sum, item) => sum + item.quantity, 0)}</span></h2>
        </div>
        {items.length > 0 && (
          <button className="clear-button" type="button" onClick={() => dispatch(clearCart())}>Clear</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <span className="bag-outline" aria-hidden="true">□</span>
          <p>Your bag is taking a breather.</p>
          <span>Pick something you love from the collection.</span>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="cart-thumb"><img src={item.image} alt="" /></div>
                <div className="cart-item-copy">
                  <h3>{item.title}</h3>
                  <span>{currency.format(item.price)}</span>
                  <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
                    <button type="button" aria-label={`Decrease ${item.title} quantity`} onClick={() => dispatch(changeQuantity({ id: item.id, amount: -1 }))}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase ${item.title} quantity`} onClick={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))}>+</button>
                  </div>
                </div>
                <button className="cart-remove" type="button" aria-label={`Remove ${item.title}`} onClick={() => dispatch(removeFromCart(item.id))}>×</button>
              </li>
            ))}
          </ul>

          <div className="shipping-note">
            {subtotal >= SHIPPING_THRESHOLD
              ? 'Your order ships free.'
              : `Add ${currency.format(SHIPPING_THRESHOLD - subtotal)} for complimentary shipping.`}
          </div>
          <div className="cart-totals">
            <div><span>Subtotal</span><span>{currency.format(subtotal)}</span></div>
            <div><span>Shipping</span><span>{shipping === 0 ? 'Complimentary' : currency.format(shipping)}</span></div>
            <div className="total-line"><span>Total</span><strong>{currency.format(subtotal + shipping)}</strong></div>
          </div>
          <button className="checkout-button" type="button" onClick={() => window.alert('Checkout is simulated for this exercise.')}>Continue to checkout <span aria-hidden="true">↗</span></button>
        </>
      )}

      <div className="cart-footnote"><span aria-hidden="true">✳</span> Thoughtfully chosen. Made to keep.</div>
    </aside>
  )
}