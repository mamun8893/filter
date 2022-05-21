import React from "react";
import ListItem from "./ListItem/ListItem";
import "./style.css";

const List = ({ list }) => {
  return (
    <div className="list-wrap">
      {list.map((item, index) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default List;
