import { useState } from 'react'
import './App.css'
import products from './data/products'
import ProductCard from './components/ProductCard'
import ProductDetails from './components/ProductDetails'
import Checkout from './components/Checkout'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const categories = [
    'All',
    'Tech',
    'Audio',
    'Wearables',
    'Workspace',
    'Accessories',
    'Lifestyle',
  ]

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })

    setIsCartOpen(true)
  }

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    )
  }

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === product.id
      )

      if (alreadySaved) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        )
      }

      return [...currentWishlist, product]
    })
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cart
    .reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )
    .toLocaleString()

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' ||
      product.category === activeCategory

    const searchText = searchQuery.toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)

    return matchesCategory && matchesSearch
  })

  // PRODUCT DETAILS PAGE
  if (selectedProduct) {
    return (
      <div className="app">
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.some(
            (item) => item.id === selectedProduct.id
          )}
        />
      </div>
    )
  }

  // CHECKOUT PAGE
  if (checkoutOpen) {
    return (
      <Checkout
        cart={cart}
        onBack={() => setCheckoutOpen(false)}
        onOrderComplete={() => setCart([])}
      />
    )
  }

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <div className="nav-logo">
          NOVA<span>.</span>
        </div>

        <nav className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#discover">Discover</a>
          <a href="#categories">Categories</a>
        </nav>

        <div className="nav-actions">

          <button
            className="nav-search"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            Search
          </button>

          <button
            className="nav-cart"
            onClick={() =>
              setIsCartOpen(true)
            }
          >
            Bag
            {cartCount > 0 && (
              <span>{cartCount}</span>
            )}
          </button>

        </div>

      </header>


      {/* SEARCH */}

      {searchOpen && (
        <div className="search-panel">

          <div className="search-inner">

            <span>⌕</span>

            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />

            {searchQuery && (
              <button
                onClick={() =>
                  setSearchQuery('')
                }
              >
                ×
              </button>
            )}

          </div>

        </div>
      )}


      {/* HERO */}

      <main>

        <section className="hero" id="discover">

          <div className="hero-content">

            <span className="section-label">
              CURATED / 2026
            </span>

            <h1>
              BETTER
              <br />
              THINGS.
            </h1>

            <p>
              Thoughtfully selected products for
              people who care about design,
              quality, and the little details.
            </p>

            <a
              href="#shop"
              className="hero-button"
            >
              Explore collection →
            </a>

          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              NOVA
            </div>
          </div>

        </section>


        {/* TICKER */}

        <div className="ticker">

          <div>
            NOVA / NEW ARRIVALS / DESIGN /
            QUALITY / NOVA / NEW ARRIVALS /
            DESIGN / QUALITY /
          </div>

        </div>


        {/* PRODUCTS */}

        <section
          className="products-section"
          id="shop"
        >

          <div className="section-heading">

            <div>
              <span className="section-label">
                THE COLLECTION
              </span>

              <h2>
                GOOD STUFF.
              </h2>
            </div>

            <p>
              A small collection of things
              worth having.
            </p>

          </div>


          {/* CATEGORY FILTER */}

          <div
            className="category-filter"
            id="categories"
          >

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>


          {/* PRODUCT GRID */}

          <div className="product-grid">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.some(
                    (item) => item.id === product.id
                  )}
                  onViewDetails={() =>
                    setSelectedProduct(product)
                  }
                />
              ))
            ) : (
              <div className="no-results">

                <h3>
                  Nothing found.
                </h3>

                <p>
                  Try another search or category.
                </p>

              </div>
            )}

          </div>

        </section>

      </main>


      {/* CART DRAWER */}

      {isCartOpen && (
        <>

          <div
            className="cart-overlay"
            onClick={() =>
              setIsCartOpen(false)
            }
          />

          <aside className="cart-drawer">

            <div className="cart-header">

              <div>
                <span className="section-label">
                  YOUR BAG
                </span>

                <h2>
                  {cartCount} items
                </h2>
              </div>

              <button
                className="cart-close"
                onClick={() =>
                  setIsCartOpen(false)
                }
              >
                ×
              </button>

            </div>


            <div className="cart-items">

              {cart.length === 0 ? (
                <div className="empty-cart">

                  <div className="empty-cart-icon">
                    +
                  </div>

                  <h3>
                    Your bag is empty.
                  </h3>

                  <p>
                    Add something you like
                    and it'll show up here.
                  </p>

                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-info">

                      <span>
                        {item.category}
                      </span>

                      <h3>
                        {item.name}
                      </h3>

                      <strong>
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}{' '}
                        ETB
                      </strong>


                      <div className="cart-item-bottom">

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>


                        <button
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>


            {cart.length > 0 && (
              <div className="cart-footer">

                <div className="cart-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    {cartTotal} ETB
                  </strong>

                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setIsCartOpen(false)
                    setCheckoutOpen(true)
                  }}
                >
                  Checkout →
                </button>

              </div>
            )}

          </aside>

        </>
      )}

    </div>
  )
}

export default App