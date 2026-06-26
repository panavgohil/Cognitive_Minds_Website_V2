import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';

// Import your pages
import Home from './pages/Home';
import Council from './pages/Council';
import Archive from './pages/Archive';
import Competitions from './pages/Competitions';
import Rulebook from './pages/Rulebook';
import Gallery from './pages/Gallery';
import TournamentPhotos from './pages/TournamentPhotos';
import Recruitment from './pages/Recruitment';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import UpdatePassword from './pages/UpdatePassword';



// Import your Auth Guard
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="relative isolate flex min-h-screen flex-col bg-background text-primary">
        <div className="flex-1 bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/council" element={<Council />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/rulebook" element={<Rulebook />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:id" element={<TournamentPhotos />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
// Inside your <Routes>...
