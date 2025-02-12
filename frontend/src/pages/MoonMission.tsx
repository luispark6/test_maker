import { Rocket } from "lucide-react";
import Section from "../components/Section";

const MoonMission = () => (
  <Section
    title="Moon Mission"
    description="Comprehensive 1-week study program with daily goals, progress tracking, and interactive exercises."
    icon={<Rocket className="w-8 h-8" />}
  />
);

export default MoonMission;
