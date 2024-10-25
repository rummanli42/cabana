import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Step from "./Components/Step";

function App() {
  return (
    <>
      <div id="main-wrapper">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Default route redirecting to /step/1 */}
          <Route path="/" element={<Navigate to="/step/1" replace />} />
          <Route path="/step/:index" element={<Step />} />
        </Routes>
        <Footer />
        </BrowserRouter>
        </div>
    </>
  );
}

export default App;
