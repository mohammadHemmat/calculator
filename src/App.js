import "./App.css";
import { Route, Routes } from "react-router-dom";
import Calculator from "./components/calculator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}

export default App;
