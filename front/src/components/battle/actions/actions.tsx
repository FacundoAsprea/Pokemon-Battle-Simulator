import ActionsButton from "./button";
interface props {
  text: string;
  isPlayersTurn: boolean;
}
const ActionsMenu = ({ text, isPlayersTurn }: props) => {
  return (
    <div className="bg-[#181818] w-full flex flex-col h-[40%] z-3">
      <div className="text-white text-md h-[35%]">{text}</div>
      {isPlayersTurn ? (
        <div className="flex h-[65%]">
          <ActionsButton variant="ATACAR"></ActionsButton>
          <ActionsButton variant="CAMBIAR"></ActionsButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ActionsMenu;
