import React from "react";
import "./App.css";
import TextInput from "./components/TextField"
import Button from "./components/Button";

function App() {
  return (
    <div className="App bg-gray-100 flex items-center min-h-screen p-4">
      <div className="bg-white container">
        <TextInput
          value="asd"
          placeholder="Test"
          onChange={(e) => console.log(e)}
        />
        <div className="mt-4">
          <Button>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
