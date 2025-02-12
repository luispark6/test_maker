import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Calendar, Rocket, Mountain } from "lucide-react";
import MidnightRide from "./pages/MidnightRide";
import DDayPrep from "./pages/DDayPrep";
import MoonMission from "./pages/MoonMission";
import GreatWall from "./pages/GreatWall";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen w-full fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="min-h-screen w-full relative">
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="sticky top-0 w-full bg-white shadow-lg backdrop-blur-sm bg-opacity-90 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-3xl">📚</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Study Guide
                </span>
              </Link>
              
              <div className="hidden md:flex space-x-8">
                <NavLink to="/midnight-ride" icon={<BookOpen className="w-4 h-4" />}>
                  Midnight Ride
                </NavLink>
                <NavLink to="/d-day-prep" icon={<Calendar className="w-4 h-4" />}>
                  D-Day Prep
                </NavLink>
                <NavLink to="/moon-mission" icon={<Rocket className="w-4 h-4" />}>
                  Moon Mission
                </NavLink>
                <NavLink to="/great-wall" icon={<Mountain className="w-4 h-4" />}>
                  Great Wall
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnimatedRoutes />
          </div>
        </main>
      </div>
    </Router>
    </div>
    </div>
  );
}

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/midnight-ride" element={<MidnightRide />} />
          <Route path="/d-day-prep" element={<DDayPrep />} />
          <Route path="/moon-mission" element={<MoonMission />} />
          <Route path="/great-wall" element={<GreatWall />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Custom NavLink Component
const NavLink = ({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default App;
