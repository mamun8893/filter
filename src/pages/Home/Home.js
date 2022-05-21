import React, { useEffect, useState } from "react";
import "./home.css";
import FilterPanel from "../../components/Home/FilterPanel/FilterPanel";
import List from "../../components/Home/List/List";
import Searchbar from "../../components/Home/Searchbar/Searchbar";
import { dataList } from "../../constants";
import EmptyView from "../../components/common/EmptyView/EmptyView";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [list, setList] = useState(dataList);
  const [searchInput, setSearchInput] = useState("");
  const [resultFound, setResultFound] = useState(true);
  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: "American" },
    { id: 2, checked: false, label: "Chinese" },
    { id: 3, checked: false, label: "Italian" },
  ]);
  const handleSelectToggle = (event, value) => {
    return !value ? null : setSelectedCategory(value);
  };
  const handleRatingToggle = (event, value) => {
    return !value ? null : setSelectedRating(value);
  };

  const HandleChangeChecked = (id) => {
    const cuisineStateList = cuisines;
    const changeCheckCuisine = cuisineStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckCuisine);
  };

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilter = () => {
    let updatedList = dataList;
    //Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

    //Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    //Cuisine Filter

    const cuisineChecked = cuisines
      .filter((item) => item.checked === true)
      .map((item) => item.label.toLowerCase());
    if (cuisineChecked.length > 0) {
      updatedList = updatedList.filter((item) =>
        cuisineChecked.includes(item.cuisine.toLowerCase())
      );
    }

    //Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    //Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    setList(updatedList);
    updatedList.length > 0 ? setResultFound(true) : setResultFound(false);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedRating, selectedCategory, cuisines, selectedPrice, searchInput]);

  return (
    <div className="home">
      {/* Searchbar  */}
      <Searchbar
        value={searchInput}
        handleChange={(e) => setSearchInput(e.target.value)}
      />

      {/* Sidebar Panel  */}
      <div className="home-panellist-warp">
        <div className="home-panel-warp">
          <FilterPanel
            selectedCategory={selectedCategory}
            handleSelectToggle={handleSelectToggle}
            selectedRating={selectedRating}
            handleRatingToggle={handleRatingToggle}
            cuisines={cuisines}
            HandleChangeChecked={HandleChangeChecked}
            changePrice={handleChangePrice}
            selectedPrice={selectedPrice}
          />
        </div>
        {/* List Warp  */}
        <div className="home-list-warp">
          {resultFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
