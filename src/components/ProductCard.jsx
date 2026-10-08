function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onViewDetails,
}) {
  return (
    <article className="product-card">
      <div
        className="product-image"
        onClick={onViewDetails}
      >
        <img src={product.image} alt={product.name} />

        <span className="product-badge">
          {product.badge}
        </span>

        <button
          className={
            isWishlisted
              ? 'wishlist-button wishlisted'
              : 'wishlist-button'
          }
          onClick={(event) => {
            event.stopPropagation()
            onToggleWishlist(product)
          }}
          aria-label={
            isWishlisted
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <button
          className="quick-add"
          onClick={(event) => {
            event.stopPropagation()
            onAddToCart(product)
          }}
        >
          Quick add
          <span>+</span>
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <h3 onClick={onViewDetails}>
          {product.name}
        </h3>

        <div className="product-bottom">
          <div className="product-rating">
            <span>★</span>
            {product.rating}
            <small>({product.reviews})</small>
          </div>

          <strong>
            {product.price.toLocaleString()} ETB
          </strong>
        </div>
      </div>
    </article>
  )
}

export default ProductCard