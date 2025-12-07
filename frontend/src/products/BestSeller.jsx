import ProductGrid from "./ProductGrid";

const BestSellerList = ({ products }) => {
  return (
    <div className="container mx-auto">
      <ProductGrid products={products} />
    </div>
  );
};

export default BestSellerList;
