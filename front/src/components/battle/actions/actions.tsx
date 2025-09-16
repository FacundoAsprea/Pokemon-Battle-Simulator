import ActionsButton from "./button";
interface props {
  text: [
    battleText: string,
    setBattleText: React.Dispatch<React.SetStateAction<string>>
  ];
}
const ActionsMenu = ({ text }: props) => {
  const [battleText] = text
  return (
    <div className="bg-[#252525] w-full flex flex-col h-[40%] z-3">
      <div className="text-white text-md h-[35%]">{battleText}</div>
        <div className="flex h-[65%]">
          <ActionsButton variant="ATACAR" text={text}></ActionsButton>
          <ActionsButton variant="CAMBIAR" text={text}></ActionsButton>
        </div>
    </div>
  );
};

export default ActionsMenu;
