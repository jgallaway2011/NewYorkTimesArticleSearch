import React from "react";

export const ArticleList = ({ children }) => {
  return (
    <div>
      <ul className="list-unstyled">
        {children}
      </ul>
    </div>
  );
};
