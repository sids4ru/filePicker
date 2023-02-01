import React, { useState, useMemo } from "react";
import SingleImagePicker from "./SingleImagePicker";
import "./styles.css";

export default function App() {
  const [showPicker, setShowPicker] = useState(true);
  const buttonText = useMemo(() => (showPicker ? "Hide" : "Show"), [
    showPicker
  ]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {showPicker && <SingleImagePicker />}
      <button
        onClick={() => {
          setShowPicker(!showPicker);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
