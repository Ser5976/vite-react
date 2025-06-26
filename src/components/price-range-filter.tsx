import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './price-range-filter.css';

const PriceRangeFilter = () => {
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  useEffect(() => {
    if (minPrice > maxPrice) {
      setMinPrice(maxPrice);
    }
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 100;
    setMaxPrice(value);
  };

  const applyFilter = () => {
    navigate(`/?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  return (
    <div className="price-filter-container">
      <h2 className="price-filter-title">Фильтр по цене</h2>
      <div className="price-inputs">
        <div className="price-input-group">
          <label htmlFor="minPrice">От</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            max="100"
            value={minPrice}
            onChange={handleMinChange}
            className="price-input"
          />
        </div>
        <div className="price-input-group">
          <label htmlFor="maxPrice">До</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            max="100"
            value={maxPrice}
            onChange={handleMaxChange}
            className="price-input"
          />
        </div>
      </div>
      <div className="price-slider">
        <input
          type="range"
          min="0"
          max="100"
          value={minPrice}
          onChange={handleMinChange}
          className="slider min-slider"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxPrice}
          onChange={handleMaxChange}
          className="slider max-slider"
        />
      </div>
      <button onClick={applyFilter} className="apply-button">
        Применить фильтр
      </button>
    </div>
  );
};

export default PriceRangeFilter;
