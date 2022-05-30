import * as React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import MainTestComponent from "../components/MainTestComponent";



const App = () => {
  return (
    <div className="app">
      <Router>
        <MainTestComponent />
      </Router>
    </div>
  )
}

export default App;