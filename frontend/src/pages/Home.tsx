import { Link } from "react-router-dom";
import { BookOpen, Calendar, Rocket, Mountain } from "lucide-react";
import Section from "../components/Section";
import { motion } from "framer-motion";

const Home = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center space-y-8 text-center"
  >
    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      Welcome to Study Guide
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl">
      Choose a study plan that fits your schedule and learning style. From quick reviews to comprehensive programs, we've got you covered.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
      <Link to="/midnight-ride" className="focus:outline-none">
        <Section title="Midnight Ride" description="Last-minute studying guide" icon={<BookOpen className="w-8 h-8" />} />
      </Link>
      <Link to="/d-day-prep" className="focus:outline-none">
        <Section title="D-Day Prep" description="1-3 day studying plan" icon={<Calendar className="w-8 h-8" />} />
      </Link>
      <Link to="/moon-mission" className="focus:outline-none">
        <Section title="Moon Mission" description="1-week studying plan" icon={<Rocket className="w-8 h-8" />} />
      </Link>
      <Link to="/great-wall" className="focus:outline-none">
        <Section title="Great Wall" description="Long-term studying strategy" icon={<Mountain className="w-8 h-8" />} />
      </Link>
    </div>
  </motion.div>
);

export default Home;
