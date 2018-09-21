import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onItemSelect,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <button
            key={` listGroup-${item[valueProperty]}`}
            type="button"
            className={
              selectedItem === item
                ? "list-group-item list-group-item-action clickable active"
                : "list-group-item list-group-item-action clickable"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </button>
        );
      })}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
