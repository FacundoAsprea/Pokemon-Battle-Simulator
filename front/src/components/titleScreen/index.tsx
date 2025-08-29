import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import title from "../../assets/title.png";
import screenImage from "../../assets/introImage.jpg";

const TitleScreen = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${screenImage})` }}
        className="py-10 h-screen w-screen flex flex-col items-center justify-between bg-no-repeat bg-center bg-contain"
      >
        <div className="flex flex-col items-center">
          <img src={title} className="pt-10 max-h-[250px]" />
          <p className="text-3xl text-white">Indu Version</p>
        </div>
        <Link to="/team-selection">
          <Button
            className="bg-transparent text-white w-[30dvw]"
            variant="outline"
          >
            Iniciar
          </Button>
        </Link>
      </div>
    </>
  );
};

export default TitleScreen;
