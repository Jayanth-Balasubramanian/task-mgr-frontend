import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/signin";
import React from "react";
import ToDoApp from "./pages/ToDoApp";
import SignUp from "./components/sign up";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/app" element={<ToDoApp />} />
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    )

}

export default App;
