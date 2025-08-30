
import { Link } from "react-router-dom";
import titleScreen from '../../assets/video/TitleScreen.webm'

const TitleScreen = () => {
  return (
    <>
      <div
        className="py-10 h-screen w-screen flex flex-col items-center justify-center"
      >
        <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-fit z-1">
          <source src={titleScreen} type="video/webm"/>
        </video>
        <p className="text-3xl z-2 bg-[#4c483d] text-[#95e444] mt-3 p-1">Facu Edition</p>
        <Link to="/team-selection" className="z-2 absolute bottom-0 mb-[150px]">
         <button className="w-[300px] cursor-pointer" />
        </Link>
      </div>
    </>
  );
};

export default TitleScreen;
