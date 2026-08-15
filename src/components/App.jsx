import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";
import Header from "./Header";
import PlantPage from "./PlantPage";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  }

  function handleSoldOut(id) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, outOfStock: true } : plant,
      ),
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={filteredPlants} onSoldOut={handleSoldOut} />
    </div>
  );
}

export default App;
