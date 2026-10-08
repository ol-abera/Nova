import { useState } from 'react'

function Checkout({
  cart,
  onBack,
  onOrderComplete,
}) {
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  })

  const [errors, setErrors] = useState({})

  const [paymentMethod, setPaymentMethod] =
    useState('Chapa')

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email = 'Enter a valid email'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!form.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!form.address.trim()) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const continueToPayment = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setStep(2)
  }

  const placeOrder = () => {
    setStep(3)
    onOrderComplete()
  }

  return (
    <main className="checkout-page">

      {/* TOP */}

      <div className="checkout-top">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to cart
        </button>

        <div className="checkout-logo">
          NOVA<span>.</span>
        </div>

      </div>


      <div className="checkout-container">

        <div className="checkout-main">

          {/* STEP 1 */}

          {step === 1 && (
            <>
              <div className="checkout-heading">

                <span className="section-label">
                  CHECKOUT / 01
                </span>

                <h1>
                  WHERE SHOULD
                  <br />
                  WE SEND IT?
                </h1>

              </div>


              <form
                className="checkout-form"
                onSubmit={continueToPayment}
              >

                {/* NAME */}

                <div className="form-group full">

                  <label>
                    Full name
                  </label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />

                  {errors.fullName && (
                    <span className="form-error">
                      {errors.fullName}
                    </span>
                  )}

                </div>


                {/* EMAIL + PHONE */}

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="form-error">
                        {errors.email}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label>
                      Phone
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+251..."
                    />

                    {errors.phone && (
                      <span className="form-error">
                        {errors.phone}
                      </span>
                    )}

                  </div>

                </div>


                {/* CITY + ADDRESS */}

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      City
                    </label>

                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Addis Ababa"
                    />

                    {errors.city && (
                      <span className="form-error">
                        {errors.city}
                      </span>
                    )}

                  </div>


                  <div className="form-group">

                    <label>
                      Address
                    </label>

                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Street / area"
                    />

                    {errors.address && (
                      <span className="form-error">
                        {errors.address}
                      </span>
                    )}

                  </div>

                </div>


                <button
                  className="checkout-continue"
                  type="submit"
                >
                  Continue to payment →
                </button>

              </form>
            </>
          )}


          {/* STEP 2 */}

          {step === 2 && (
            <>
              <div className="checkout-heading">

                <span className="section-label">
                  CHECKOUT / 02
                </span>

                <h1>
                  HOW DO YOU
                  <br />
                  WANT TO PAY?
                </h1>

              </div>


              <div className="payment-options">

                <button
                  type="button"
                  className={
                    paymentMethod === 'Chapa'
                      ? 'payment-option active'
                      : 'payment-option'
                  }
                  onClick={() =>
                    setPaymentMethod('Chapa')
                  }
                >

                  <div>

                    <strong>
                      Chapa
                    </strong>

                    <span>
                      Secure online payment
                    </span>

                  </div>

                  <span className="payment-check">
                    {paymentMethod === 'Chapa'
                      ? '✓'
                      : ''}
                  </span>

                </button>


                <button
                  type="button"
                  className={
                    paymentMethod === 'Cash'
                      ? 'payment-option active'
                      : 'payment-option'
                  }
                  onClick={() =>
                    setPaymentMethod('Cash')
                  }
                >

                  <div>

                    <strong>
                      Cash on delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                  <span className="payment-check">
                    {paymentMethod === 'Cash'
                      ? '✓'
                      : ''}
                  </span>

                </button>

              </div>


              <div className="checkout-actions">

                <button
                  className="secondary-checkout-button"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>

                <button
                  className="checkout-continue"
                  onClick={placeOrder}
                >
                  Place order →
                </button>

              </div>

            </>
          )}


          {/* STEP 3 */}

          {step === 3 && (
            <div className="order-success">

              <div className="success-icon">
                ✓
              </div>

              <span className="section-label">
                ORDER CONFIRMED
              </span>

              <h1>
                YOU'RE
                <br />
                ALL SET.
              </h1>

              <p>
                Thanks for shopping with NOVA.
                Your order has been received and
                we'll take care of the rest.
              </p>

              <button
                className="checkout-continue"
                onClick={onBack}
              >
                Back to shopping →
              </button>

            </div>
          )}

        </div>


        {/* ORDER SUMMARY */}

        <aside className="checkout-summary">

          <div className="summary-header">

            <span>
              YOUR ORDER
            </span>

            <strong>
              {cart.length} items
            </strong>

          </div>


          <div className="summary-items">

            {cart.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.quantity} ×{' '}
                    {item.price.toLocaleString()} ETB
                  </span>

                </div>

              </div>
            ))}

          </div>


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              {total.toLocaleString()} ETB
            </strong>

          </div>

        </aside>

      </div>

    </main>
  )
}

export default Checkout