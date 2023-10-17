import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ClientDetails from './pages/ClientDetails';
import Archive from './pages/Archive';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>  
          <Route
          path='/archive'
          element={user ? <Archive/> : <Navigate to='/login' />}
          />
          <Route
          exact path="/map"
          element={user ? <Map/> : <Navigate to="/login" />}
          />
          <Route 
          path="/login"
          element={!user ? <Login/> : <Navigate to="/" />}
          />
          <Route 
          path="/signup"
          element={!user ? <Signup/> : <Navigate to="/" />}
          />
          <Route
          path='/api/clients/:id'
          element={user ? <ClientDetails/> : <Navigate to="/login" />}
          />
          <Route 
          exact path="/"
          element={user ? <Home/> : <Navigate to='/login' />}
          />
        </Routes>
        {user && <Footer />}
      </Router>
    </div>
  );
}

export default App;
