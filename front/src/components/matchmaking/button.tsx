const MatchmakingButton = ({ text }: { text: string }) => {
  return (
    <button className="w-1/2 border-1 border-gray-100 rounded-sm text-white py-3 cursor-pointer hover:bg-[#303030]">
      {text}
    </button>
  );
};

export default MatchmakingButton;
