import { useState, useEffect } from "react";
import { SpritesService } from "@/services/sprite.service";
import type { SpriteData } from "@/types";
import PokeCard from "./pokecard";

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
    <div className="h-screen w-screen flex flex-col items-center justify-between">
      <p className="text-white text-5xl">Forma tu equipo de 6 Pokemones</p>

      <div className="flex flex-wrap px-10">
        {sprites[0] ? (
          sprites.map((sprite) => <PokeCard spriteData={sprite} />)
        ) : (
          <p className="text-white">hola</p>
        )}
      </div>
    </div>
  );
};

export default TeamSelector;
