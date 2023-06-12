import { BrowserRouter } from 'react-router-dom';

import RoutesComponent from './routes/Routes';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
