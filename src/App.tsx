import { useEffect } from 'react';
import './App.css';
import load from './plugins';

function App() {
  useEffect(() => {
    load();
  }, []);

  return <div className="App">hello</div>;
}

export default App;
