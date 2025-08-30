import type { SpriteData } from "@/types";

const PokeCard = ({ spriteData }: { spriteData: SpriteData }) => {
  return (
    <div className="border-1 border-white rounded-lg w-[150px] h-[150px] flex justify-center items-center">
      <img src={spriteData.sprites.front_default}></img>
    </div>
  );
};

export default PokeCard;
