import AnimatedBackground from "../animatedBackground";
import MatchmakingButton from "./button";

const MatchmakingInterface = () => {
  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-start gap-5 h-full w-[70dvw] bg-background z-2">
        
        <MatchmakingButton text={"Crear sala"}/>
        <MatchmakingButton text={"Unirse"}/>
      </div>
    </AnimatedBackground>
  );
};

export default MatchmakingInterface
