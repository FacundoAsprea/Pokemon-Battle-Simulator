interface props {
  text: string;
  onClickHandler: () => void
}
const MatchmakingButton = ({ text, onClickHandler }: props) => {
  return (
    <button
      onClick={onClickHandler}
      className="w-1/2 border-1 border-gray-100 rounded-sm text-white py-3 cursor-pointer hover:bg-[#303030]"
    >
      {text}
    </button>
  );
};

export default MatchmakingButton;
