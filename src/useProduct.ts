import { useQuery } from "@tanstack/react-query";
import { search } from "./algolia";

type Product = {
  name: string;
  shortDescription?: string;
  salePrice: number;
};

export default function useProduct() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return search<Product>({
        indexName: "bestbuy",
        query: "",
        hitsPerPage: 10,
      });
    },
  });
}
