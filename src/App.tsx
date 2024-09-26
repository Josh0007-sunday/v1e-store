import './App.css';
import WalletConnectionProvider from './component/walletconnectionprovider/page';
import HomePage from './component/webapp/main/page';
import { BrowserRouter as Router } from 'react-router-dom';

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
