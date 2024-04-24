import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={SignupPage} exact/>
      <Route path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
