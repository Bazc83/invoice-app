# Tanstack query

Query requires a promise to function.

The key identifies the location of the data in cache. (Effective query on tkeuro blog)

useQuery queryKey, queryKey

```
const test = useQuery({ queryKey: ["test"], queryFn: ()=>{} })
```

keep data true

```
keepPreviousData: true,
```

````
const { data, isLoading, isFetching, isPreviousData, status } =
useProduct(filter);```

previous data could show different color/opacity


Staletime, stops queries for keys that exist
``` staleTime: 5 * 60 * 1000,```


## Main.jsx

````

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({
storage: window.localStorage,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
<PersistQueryClientProvider
client={queryClient}
persistOptions={{ persister }}

>

    <div className="App">
      <h1>React Query Product List</h1>
      <App />
    </div>
    <ReactQueryDevtools initialIsOpen />

  </PersistQueryClientProvider>
);
```

## App.jsx

```
import * as React from "react";
import "./App.css";

import ProductList from "./ProductList";
import Search from "./Search";

export default function App() {
  const [filter, setFilter] = React.useState("");

  return (
    <div>
      <Search defaultValue={filter} onSearch={setFilter} />
      <ProductList filter={filter} />
    </div>
  );
```

## ProductList.jsx

```
import useProduct from "./useProduct";

export default function ProductList({ filter }: { filter: string }) {
  const { data, isLoading, isFetching, isPreviousData, status } =
    useProduct(filter);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="search-status">
        Status: {status} {isFetching && <span>fetching...</span>}
      </div>
      <div>
        <div
          className="search-result"
          style={{ opacity: isPreviousData ? 0.5 : 1 }}
        >
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

```

## useProduct.js Hook

```
import { useQuery } from "@tanstack/react-query";
import { search } from "./algolia";

type Product = {
  name: string;
  shortDescription?: string;
  salePrice: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useProduct(filter: string) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      await sleep(500);

      return search<Product>({
        indexName: "bestbuy",
        query: filter,
        hitsPerPage: 10,
      });
    },
    keepPreviousData: true,
    // staleTime: 5 * 60 * 1000,
  });
}


```


