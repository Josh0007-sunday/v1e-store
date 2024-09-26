import './App.css';
import WalletConnectionProvider from './component/walletconnectionprovider/page';
import HomePage from './component/webapp/main/page';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <WalletConnectionProvider>
        {/* Wrap your app with Router */}
        <Router>
          <HomePage />
        </Router>
      </WalletConnectionProvider>
    </>
  );
}

export default App;
