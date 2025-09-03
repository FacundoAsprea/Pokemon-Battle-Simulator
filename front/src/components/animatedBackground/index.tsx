import titleScreen from "../../assets/video/TitleScreen.webm";

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-fit z-1"
        >
          <source src={titleScreen} type="video/webm" />
        </video>
        {children}
      </div>
    </>
  );
};

export default AnimatedBackground;
