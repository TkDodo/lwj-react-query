import { useQuery } from "@tanstack/react-query";
import { search } from "./algolia";

type Product = {
  name: string;
  shortDescription?: string;
  salePrice: number;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useProduct() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      await sleep(500);
      
      return search<Product>({
        indexName: "bestbuy",
        query: "",
        hitsPerPage: 10,
      });
    },
  });
}
