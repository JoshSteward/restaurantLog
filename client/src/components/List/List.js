import React from "react";

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};

export default List; 