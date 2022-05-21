import React from "react";
import "./filter-panel.css";
import { categoryList, ratingList } from "../../../constants";
import FilterListToggle from "../../common/FilterListToggle/FilterListToggle";
import CheckboxProton from "../../common/CheckboxProton/CheckboxProton";
import SliderProton from "../../common/SliderProton/SliderProton";

const FilterPanel = ({
  selectedCategory,
  handleSelectToggle,
  selectedRating,
  handleRatingToggle,
  cuisines,
  HandleChangeChecked,
  selectedPrice,
  changePrice,
}) => {
  return (
    <div>
      {/* Category  */}
      <div className="input-group">
        <p className="label">Category</p>
        <FilterListToggle
          options={categoryList}
          value={selectedCategory}
          handleSelectToggle={handleSelectToggle}
        />
        {cuisines.map((cuisine) => (
          <CheckboxProton
            key={cuisine.id}
            HandleChangeChecked={HandleChangeChecked}
            cuisine={cuisine}
          />
        ))}
      </div>
      {/* Peice  */}
      <SliderProton value={selectedPrice} changePrice={changePrice} />
      {/* Star Rating  */}
      <div className="input-group">
        <p className="label">Rating</p>
        <FilterListToggle
          options={ratingList}
          value={selectedRating}
          handleSelectToggle={handleRatingToggle}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
