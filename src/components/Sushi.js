import React from "react";

function Sushi({ sushi, onEatSushi }) {
  const { id, name, img_url, price, eaten } = sushi;

  const handleEatSushi = () => {
    if (!eaten) {
      onEatSushi(sushi);
    }
  };

  return (
    <div className="sushi">
      <div className="plate" onClick={handleEatSushi}>
        {eaten ? null : (
          <img src={img_url} alt={name} width="100%" />
        )}
      </div>
      <h4 className="sushi-details">
        {name} - ${price}
      </h4>
    </div>
  );
}

export default Sushi;
