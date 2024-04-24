import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Homepage from "./Pages/Homepage";


function App() {
  
  return <Route path="/" component={Homepage}/>;
}

export default App;
