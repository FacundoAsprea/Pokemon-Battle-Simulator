const ActionsMenu = () => {
  return (
    <div className="bg-[#181818] w-full flex flex-col h-[40%] z-3">
        <div className="text-white text-md h-[35%]">test</div>
      <div className="flex h-[65%]">
        <button className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]">
          ATACAR
        </button>
        <button className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]">
          CAMBIAR
        </button>
      </div>
    </div>
  );
};

export default ActionsMenu;
