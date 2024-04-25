import "./App.css";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ExpensePage from "./Pages/ExpensePage";

function App() {
  return (
    <>
      <Route path="/" component={SignupPage} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={ExpensePage} />
    </>
  );
}

export default App;
