// EnhancedRoomSearch.jsx
import React, { useState, useEffect } from 'react';
import { fetchHotelChains, fetchHotelCategories } from './api';

function EnhancedRoomSearch() {
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    capacity: 1,
    area: '',
    chain: '',
    category: '',
    price: '',
    amenities: []
  });
  
  const [chains, setChains] = useState([]);
  const [categories, setCategories] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Charger les données statiques au montage
    fetchHotelChains().then(setChains);
    fetchHotelCategories().then(setCategories);
    fetchAmenities().then(setAmenities);
  }, []);

  const handleSearch = async () => {
    // Implémentation similaire à RoomSearchPage mais avec plus de filtres
  };

  return (
    <div className="search-container">
      <div className="search-filters">
        <div className="filter-group">
          <label>Dates</label>
          <input type="date" name="start_date" value={filters.start_date} onChange={handleChange} />
          <input type="date" name="end_date" value={filters.end_date} onChange={handleChange} />
        </div>
        
        <div className="filter-group">
          <label>Capacité</label>
          <select name="capacity" value={filters.capacity} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Chaîne hôtelière</label>
          <select name="chain" value={filters.chain} onChange={handleChange}>
            <option value="">Toutes</option>
            {chains.map(chain => (
              <option key={chain.id} value={chain.id}>{chain.name}</option>
            ))}
          </select>
        </div>
        
        {/* Ajouter d'autres filtres de manière similaire */}
        
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      
      <div className="search-results">
        {/* Afficher les résultats avec plus de détails */}
      </div>
    </div>
  );
}
