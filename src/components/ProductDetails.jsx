function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) {
  return (
    <main className="product-details-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to shop
      </button>

      <div className="product-details">

        <div className="product-details-image">

          <img
            src={product.image}
            alt={product.name}
          />

          <span className="product-badge">
            {product.badge}
          </span>

        </div>


        <div className="product-details-info">

          <span className="product-details-category">
            {product.category}
          </span>

          <h1>
            {product.name}
          </h1>

          <div className="details-rating">
            <span>★</span>
            {product.rating}
            <small>
              ({product.reviews} reviews)
            </small>
          </div>

          <div className="details-price">
            {product.price.toLocaleString()} ETB
          </div>

          <p className="details-description">
            Designed for people who care about
            great design, useful features, and
            everyday quality. A carefully selected
            NOVA product made to fit naturally
            into your lifestyle.
          </p>


          <div className="details-actions">

            <button
              className="details-add-button"
              onClick={() =>
                onAddToCart(product)
              }
            >
              Add to bag
              <span>+</span>
            </button>

            <button
              className={
                isWishlisted
                  ? 'details-wishlist wishlisted'
                  : 'details-wishlist'
              }
              onClick={() =>
                onToggleWishlist(product)
              }
            >
              {isWishlisted ? '♥' : '♡'}
            </button>

          </div>


          <div className="product-features">

            <div>
              <strong>
                Fast delivery
              </strong>

              <span>
                Delivered across Ethiopia
              </span>
            </div>

            <div>
              <strong>
                Secure checkout
              </strong>

              <span>
                Safe and simple payments
              </span>
            </div>

            <div>
              <strong>
                NOVA quality
              </strong>

              <span>
                Curated products only
              </span>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

export default ProductDetails