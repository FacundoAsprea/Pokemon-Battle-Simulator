import AnimatedBackground from "../animatedBackground";
import { Link } from "react-router-dom";

const TitleScreen = () => {
  return (
    <AnimatedBackground>
      <p className="text-3xl z-2 bg-[#4c483d] text-[#95e444] mt-3 p-1">
        Facu Edition
      </p>
      <Link to="/team-selection" className="z-2 absolute bottom-0 mb-[150px]">
        <button className="w-[300px] cursor-pointer" />
      </Link>
    </AnimatedBackground>
  );
};

export default TitleScreen;
