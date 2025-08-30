import type { SpriteData } from "@/types";
import { capitalize } from "@/utils/functions";

const PokeCard = ({ spriteData }: { spriteData: SpriteData }) => {
  return (
    <div className="p-2 border-1 border-gray-400 w-[200px] rounded-lg flex flex-col justify-start items-start cursor-pointer hover:bg-[#303030]">
      <img
        src={spriteData.sprites.front_default}
        className="border-1 border-red-100 mx-auto"
      ></img>
      <p className="text-gray-300 text-sm">{capitalize(spriteData.name)}</p>
      <div className="flex">
        {spriteData.types.map((typeSprite) => (
          <img src={typeSprite} />
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
