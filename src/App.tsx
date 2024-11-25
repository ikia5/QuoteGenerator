import { useState } from "react";
import "./App.css";

type Quote = {
  quote: string;
  author: string;
};

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const colors = [
    { background: "#ffadad", text: "#5a0000" },
    { background: "#ffd6a5", text: "#704d00" },
    { background: "#fdffb6", text: "#545000" },
    { background: "#caffbf", text: "#004d26" },
    { background: "#9bf6ff", text: "#003e54" },
  ];

  const fetchQuote = async () => {
    try {
      setIsTransitioning(true);
      setTimeout(async () => {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/quotes?category=happiness",
          {
            headers: {
              "X-Api-Key": "nqT0aHOPoQZZUqX+edGatA==dvjXCbr98911q6Ts",
            },
          }
        );
        const data = await response.json();
        setQuote(data[0]);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty(
          "--bg-color",
          randomColor.background
        );

        setIsTransitioning(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setIsTransitioning(false);
    }
  };

  return (
    <div className={`container ${isTransitioning ? "fade-out" : "fade-in"}`}>
      <div className="quote-container">
        {quote ? (
          <div className="text">
            <h2>{quote.quote}</h2>
            <p><i>{quote.author}</i></p>
          </div>
        ) : (
          <p>No quote fetched yet</p>
        )}
        <button onClick={fetchQuote} disabled={isTransitioning}>
          {isTransitioning ? "Loading..." : "More Quote"}
        </button>
      </div>
    </div>
  );
}

export default App;
