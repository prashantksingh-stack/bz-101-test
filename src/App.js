import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState("Loading...");

  // Function to fetch API data
  const fetchData = () => {
    setApiResponse("Fetching..."); // Show loading state when button is clicked
    fetch("https://ykuajyghm6.execute-api.us-west-2.amazonaws.com/dev/test-delete-later")
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setApiResponse("Error loading data.");
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi from Being Zero! Welcome</p>
        <pre>{apiResponse}</pre>

        {/* Button to re-fetch the API data */}
        <button onClick={fetchData} style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
          Click me
        </button>
      </header>
    </div>
  );
}

export default App;
