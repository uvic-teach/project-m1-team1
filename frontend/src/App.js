import "./App.css";
import Login from "./components/login/login";
import Homepage from "./components/homepage/homepage";
import WaitList from "./components/waitlist/waitlist";
import Triage from "./components/triage/triage";
import TriageForm from "./components/triage/form";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/waitlist" element={<WaitList />} />
      </Routes>
    </>
  );
}

export default App;
