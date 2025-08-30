import { useState, useEffect } from "react";
import { SpritesService } from "@/services/sprite.service";
import type { SpriteData } from "@/types";
import PokeCard from "./pokecard";
import titleScreen from "../../assets/video/TitleScreen.webm";

const TeamSelector = () => {
  const [sprites, setSprites] = useState<SpriteData[]>([]);
  const SpriteService = new SpritesService();

  useEffect(() => {
    SpriteService.getAllSprites().then((allSprites) => {
      setSprites(allSprites.data);
      console.log("DATA: ", allSprites);
    });
  }, []);

  return (
    <div className="py-10 h-screen w-screen flex flex-col items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-fit z-1"
      >
        <source src={titleScreen} type="video/webm" />
      </video>
      <div className="flex flex-col items-center justify-between gap-5 h-full w-[70dvw] bg-background z-2">
        <p className="text-white text-3xl text-center">
          Forma tu equipo de 6 Pokemones
        </p>

        <div className="flex items-center justify-center flex-wrap gap-3 overflow-scroll">
          {sprites[0] ? (
            sprites.map((sprite) => <PokeCard spriteData={sprite} />)
          ) : (
            <p className="text-white">hola</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSelector;
