import { Route, Routes } from 'react-router-dom';
import './App.css';
import { InstrumentCodeContextProvider } from './InstrumentCodeContext';
import Announcements from './module/Page/Announcements';
import ContactUs from './module/Page/ContactUs';
import FinancialReports from './module/Page/FinancialReports';
import Home from './module/Page/Home';
import PressRelease from './module/Page/PressRelease';
import Profile from './module/Page/Profile';
import Test from './module/Page/Test';

function App() {

  return (
    
    <div className="App">
      <InstrumentCodeContextProvider>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/test" element={<Test/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/contactus" element={<ContactUs/>}></Route>
          <Route path="/instrument/profile" element={<Profile/>}/>
          <Route path="/instrument/announcements" element={<Announcements/>}/>
          <Route path="/instrument/financialreports" element={<FinancialReports/>}/>
          <Route path="/instrument/pressrelease" element={<PressRelease/>}/>
          <Route path="/instrument/documents" element={<Announcements/>}/>
          <Route path="/instrument/governance" element={<Announcements/>}/>

        </Routes>
      </InstrumentCodeContextProvider>
    </div>
  );
}

export default App;
