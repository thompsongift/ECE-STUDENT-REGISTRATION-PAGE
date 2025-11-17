import { useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Landing from "./pages/landing_page";
import RegForm from "./pages/student_reg_page";
import UpdateViaMatNum from "./pages/update_details";
import ViewViaMatNum from "./pages/view_details";
import FeedbackPage from "./pages/feedback_page";
import "./App.css";
import defaultImage from "./assets/Background1.jpg";
import { UserContext } from "./component/use_context";

function App() {
  const [handle, setHandle] = useState(true);
  const location = useLocation();

  useEffect(() => {
    document.title = "ECE Student Database";
  }, []);
  const style = {
    backgroundImage: `url(${defaultImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Routes key={location.pathname}>
      <Route
        path="/"
        element={
          <Landing style={style} handle={handle} setHandle={setHandle} />
        }
      />
      <Route path="/register" element={<RegForm style={style} />} />
      <Route
        path="/updatedetails"
        element={<UpdateViaMatNum style={style} />}
      />
      <Route path="/viewdetails" element={<ViewViaMatNum style={style} />} />
      <Route path="/viewfeedback" element={<FeedbackPage style={style} />} />
    </Routes>
  );
}

export default App;
