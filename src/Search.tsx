import * as React from "react";
export default function Search({
  onSearch,
  defaultValue,
}: {
  onSearch: (query: string) => void;
  defaultValue: string;
}) {
  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    onSearch(new FormData(event.currentTarget).get("search") as string);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search</label>

      <input
        id="search"
        defaultValue={defaultValue}
        type="search"
        name="search"
        placeholder="Search products"
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
}
