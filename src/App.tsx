import * as React from "react";
import "./App.css";

import ProductList from "./ProductList";
import Search from "./Search";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export default function App() {
  const [filter, setFilter] = React.useState("");

  return (
    <div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary, error }) => (
              <div>
                There was an error: {error.message}
                <button
                  onClick={() => {
                    resetErrorBoundary();
                  }}
                >
                  Try again
                </button>
              </div>
            )}
          >
            <Search defaultValue={filter} onSearch={setFilter} />
            <ProductList filter={filter} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
