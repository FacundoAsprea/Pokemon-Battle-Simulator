import type { SpriteData } from "@/types";
import { capitalize } from "@/utils/functions";

interface props {
  spriteData: SpriteData;
  onClickHandler: () => void;
  size: "normal" | "mini"
}

const PokeCard = ({ spriteData, onClickHandler, size }: props) => {
  return size == "normal" ?
 (
    <div
      onClick={onClickHandler}
      className="border-1 border-gray-400 min-w-[175px] rounded-sm flex flex-col justify-start items-start cursor-pointer hover:bg-[#303030]"
    >
      <img src={spriteData.sprites.front_default} className="mx-auto"></img>
      <div className="bg-[#404040] w-full p-2 rounded-b-sm">
        <p className="text-gray-300 text-sm">{capitalize(spriteData.name)}</p>
        <div className="flex gap-1">
          {spriteData.types.map((typeSprite) => (
            <img src={typeSprite} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div
      onClick={onClickHandler}
      className="border-1 border-gray-400 rounded-sm flex flex-col justify-start items-start cursor-pointer hover:bg-[#303030]"
    >
      <img src={spriteData.sprites.front_default} className="mx-auto"></img>
      <div className="bg-[#404040] w-full p-1 rounded-b-sm h-max">
        <p className="text-gray-300 text-xs">{capitalize(spriteData.name)}</p>
        <div className="flex gap-1">
          {spriteData.types.map((typeSprite) => (
            <img src={typeSprite} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default PokeCard;
