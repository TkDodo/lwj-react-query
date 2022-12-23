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
