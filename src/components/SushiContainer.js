import React, { useState, useEffect } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

const API = "http://localhost:3001/sushis";

function SushiContainer() {
  const [sushiList, setSushiList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [budget, setBudget] = useState(100);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setSushiList(data))
      .catch((error) => console.error("Error fetching sushi: ", error));
  }, []);

  const handleMoreSushi = () => {
    setStartIndex((prevIndex) => prevIndex + 4);
  };

  const handleEatSushi = (sushi) => {
    if (budget >= sushi.price) {
      const updatedSushiList = sushiList.map((s) =>
        s.id === sushi.id ? { ...s, eaten: true } : s
      );
      setSushiList(updatedSushiList);
      setBudget((prevBudget) => prevBudget - sushi.price);
    }
  };

  const displayedSushi = sushiList.slice(startIndex, startIndex + 4);

  return (
    <div className="belt">
      {displayedSushi.map((sushi) => (
        <Sushi key={sushi.id} sushi={sushi} onEatSushi={handleEatSushi} />
      ))}
      <MoreButton onClickMore={handleMoreSushi} />
    </div>
  );
}

export default SushiContainer;
