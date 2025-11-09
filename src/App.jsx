import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Landing from "./pages/landing_page";
import RegForm from "./pages/student_reg_page";
import UpdateViaMatNum from "./pages/update_details";
import ViewViaMatNum from "./pages/view_details";
import "./App.css";
import defaultImage from "./assets/Background1.jpg";
import { UserContext } from "./component/use_context";

function App() {
  const [page, setPage] = useState("Dashboard");

  useEffect(() => {
    document.title = "ECE Student Database";
  }, []);
  const style = {
    backgroundImage: `url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <UserContext.Provider value={{ page, setPage }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing style={style} />} />
          <Route path="/register" element={<RegForm style={style} />} />
          <Route
            path="/updatedetails"
            element={<UpdateViaMatNum style={style} />}
          />
          <Route
            path="/viewdetails"
            element={<ViewViaMatNum style={style} />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
