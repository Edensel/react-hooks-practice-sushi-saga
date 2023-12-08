import React, { useState, useEffect } from "react";
import MoreButton from "./MoreButton";
import Sushi from "./Sushi";

const API = "http://localhost:3001/sushis";

function SushiContainer() {
  const [sushiList, setSushiList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [budget, setBudget] = useState(100);
  const [walletInput, setWalletInput] = useState("");

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setSushiList(data))
      .catch((error) => console.error("Error fetching sushi: ", error));
  }, []);

  const handleMoreSushi = () => {
    const newStartIndex = (startIndex + 4) % sushiList.length;
    setStartIndex(newStartIndex);
  };

  const handleEatSushi = (sushi) => {
    if (!sushi.eaten && budget >= sushi.price) {
      const updatedSushiList = sushiList.map((s) =>
        s.id === sushi.id ? { ...s, eaten: true } : s
      );
      setSushiList(updatedSushiList);
      setBudget((prevBudget) => prevBudget - sushi.price);
    }
  };

  const displayedSushi = sushiList.slice(startIndex, startIndex + 4);

  const handleWalletInput = (e) => {
    setWalletInput(e.target.value);
  };

  const handleAddToWallet = (e) => {
    e.preventDefault();
    const amount = parseInt(walletInput);
    if (!isNaN(amount) && amount > 0) {
      setBudget((prevBudget) => prevBudget + amount);
      setWalletInput("");
    }
  };

  return (
    <div className="belt">
      {displayedSushi.map((sushi) => (
        <Sushi key={sushi.id} sushi={sushi} onEatSushi={handleEatSushi} />
      ))}
      <MoreButton onClickMore={handleMoreSushi} />
      <form className="wallet-form" onSubmit={handleAddToWallet}>
        <input
          type="number"
          placeholder="Add money to wallet"
          value={walletInput}
          onChange={handleWalletInput}
        />
        <button type="submit">Add</button>
      </form>
      <h3>Remaining Budget: ${budget}</h3>
    </div>
  );
}

export default SushiContainer;
