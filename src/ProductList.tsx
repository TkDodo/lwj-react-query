import useProduct from "./useProduct";

export default function ProductList({ filter }: { filter: string }) {
  const {
    data,
    isLoading,
    isFetching,
    isPaused,
    status,
    isPreviousData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProduct(filter);

  if (isLoading) return <div className="loading">Loading...</div>;

  const products = data?.pages.flatMap((page) => page.hits) ?? [];

  return (
    <div>
      <div
        className="search-status"
        style={{ color: isPaused ? "red" : undefined }}
      >
        status: {status} {isFetching && <span>fetching...</span>}
      </div>
      <div>
        <div
          className="search-result"
          style={{
            opacity: isPreviousData ? 0.5 : 1,
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
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
          {hasNextPage && <button onClick={() => fetchNextPage()}>more</button>}
          {isFetchingNextPage && (
            <div className="search-status">Fetching next page...</div>
          )}
        </div>
      </div>
    </div>
  );
}
