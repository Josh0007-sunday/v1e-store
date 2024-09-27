import './App.css';
import WalletConnectionProvider from './component/walletconnectionprovider/page';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import MarketPage from './landingpage/page';
import ProfileDashboard from './component/webapp/profile/page';
import HomePage from './component/webapp/main/page';
import { Buffer } from "buffer";

(window as any).Buffer = Buffer;

function App() {
  return (
    <>
      <WalletConnectionProvider>
        {/* Wrap your app with Router */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MarketPage/>} />
            <Route path='/profile' element={<ProfileDashboard/>}/>
            <Route  path='/home' element={<HomePage/>}/>
            {/* <MarketPage /> */}
          </Routes>
        </BrowserRouter>
      </WalletConnectionProvider>
    </>
  );
}

export default App;
