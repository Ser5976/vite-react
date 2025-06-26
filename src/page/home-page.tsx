import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PriceRangeFilter from "../components/price-range-filter";
import type { Product } from "../types";

const fetchFilteredProducts = async (minPrice: number, maxPrice: number): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          name: `Товар ${i + 1}`,
          price: Math.floor(Math.random() * 100),
        }));
        
        const filtered = mockProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        resolve(filtered);
      }, 500);
    });
  };

function HomePage(){
    const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '100');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchFilteredProducts(minPrice, maxPrice);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [minPrice, maxPrice]);

    return(<>
    <h2 className="">Home page </h2>
    <div className="products-page">
      <h1>Фильтрация товаров по цене</h1>
      <PriceRangeFilter />
      
      <div className="results-container">
        <h2>Результаты (цена от {minPrice} до {maxPrice})</h2>
        
        {loading ? (
          <p className="loading">Загрузка...</p>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price}</p>
                </div>
              ))
            ) : (
              <p className="no-results">Товары не найдены</p>
            )}
          </div>
        )}
      </div>
    </div>

    </>)

    
}
export default HomePage