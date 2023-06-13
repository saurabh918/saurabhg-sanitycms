import { BrowserRouter } from 'react-router-dom';

import RoutesComponent from './routes/Routes';

import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
        <main>
          <div className='wrapper'>
            <RoutesComponent />
          </div>
        </main>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
