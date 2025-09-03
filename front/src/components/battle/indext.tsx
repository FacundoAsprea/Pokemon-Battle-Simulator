interface props {
    children?: React.ReactNode
}
const BattleWrapper = ({ children }: props) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <main className="flex h-full w-[70%] bg-red-300">
            {children}
        </main>
    </div>
  );
};

export default BattleWrapper;
