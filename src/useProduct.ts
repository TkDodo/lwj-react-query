import { useInfiniteQuery } from "@tanstack/react-query";
import { search } from "./algolia";
import { z } from "zod";

const productSchema = z.object({
  objectID: z.string(),
  name: z.string(),
  shortDescription: z.string().nullable(),
  salePrice: z.number(),
});

const productsSchema = z.object({
  hits: z.array(productSchema),
  nextPage: z.number().optional(),
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useProduct(filter: string) {
  return useInfiniteQuery({
    queryKey: ["products", filter],
    queryFn: async ({ pageParam = 0 }) => {
      await sleep(500);
      if (filter === "banana" && Math.random() > 0.5) {
        throw new Error("banana is not a valid filter");
      }

      const response = await search({
        indexName: "bestbuy",
        query: filter,
        pageParam,
        hitsPerPage: 10,
      });

      return productsSchema.parse(response);
    },
    keepPreviousData: true,
    useErrorBoundary: (error, query) => typeof query.state.data === "undefined",
    retry: 0,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });
}
