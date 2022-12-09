import React, {useEffect} from 'react';
import './css/App.css';
import Events from "./pages/Events";
import AppRouter from "./components/AppRouter";
import {useActions} from "./hooks/useActions";

function App() {

  useEffect(() => {
  },[])

  return (
    <div className="App">
      {/*<Events/>*/}
        <AppRouter/>
    </div>
  );
}

export default App;
