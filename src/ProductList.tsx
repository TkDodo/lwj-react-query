import useProduct from "./useProduct";

export default function ProductList() {
  const { data, isLoading, isFetching, status } = useProduct();

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="search-status">
        Status: {status} {isFetching && <span>fetching...</span>}
      </div>
      <div>
        <div className="search-result">
          {data?.hits && data.hits.length > 0 ? (
            data.hits.map((product) => (
              <li key={product.objectID} className="product">
                <span className="product-name">{product.name}</span>
                {product.shortDescription && (
                  <>
                    <br />
                    <span className="product-description">
                      {product.shortDescription}
                    </span>
                  </>
                )}
                <br />
                <span className="product-price">${product.salePrice}</span>
              </li>
            ))
          ) : (
            <h3>No products found!</h3>
          )}
        </div>
      </div>
    </div>
  );
}
