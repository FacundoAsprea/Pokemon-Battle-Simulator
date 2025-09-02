import { useState } from "react";
import AnimatedBackground from "../animatedBackground";
import MatchmakingButton from "./button";
import { IpService } from "@/services/ip.service";
import { WebSocketService } from "@/services/websocket.service";

const MatchmakingInterface = () => {
  const [ip, setIp] = useState<string>();
  const [joinRoomIp, setJoinRoomIp] = useState<string>('');
  const [clicked, setClicked] = useState(false);

  const createRoom = async () => {
    const ipService = new IpService();

    const { data } = await ipService.getIp();
    setIp(data);
    setClicked(true);

    const webSocket = new WebSocketService({ name: "test" }, data);
    webSocket.waitForBattle();
    webSocket.joinRoom();
  };

  const joinRoom = (ip: string) => {
    const webSocket = new WebSocketService({ name: "test2" }, ip);
    webSocket.waitForBattle();
    webSocket.joinRoom();
  };

  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center gap-5 h-screen w-[70dvw] bg-background z-2">
        {clicked ? (
          ip ? (
            <div className="flex flex-col items-center justify-center gap-2 relative h-full w-full">
              <a href='matchmaking' className="bg-[#404040] px-3 py-1 text-white rounded-sm absolute top-1/8 left-1/8 cursor-pointer">{'<'}</a>
              <p className="text-white">Sala creada con la IP: {ip}</p>
              <p className="text-white">Esperando a la conexion LAN...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 relative h-full w-full">
              <a href='matchmaking' className="bg-[#404040] px-3 py-1 text-white rounded-sm absolute top-1/8 left-1/8 cursor-pointer">{'<'}</a>
              <p className="text-white">Ingresa la IP de la sala:</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  joinRoom(joinRoomIp);
                }}
                className="flex flex-row gap-2"
              >
                <input
                  onChange={(event) => setJoinRoomIp(event.target.value)}
                  placeholder="Ip..."
                  className="text-white border-1 border-gray-400 p-3 rounded-sm"
                />
                <input
                  type="submit"
                  placeholder="Enviar"
                  className="bg-[#303030] text-white p-2 rounded-sm cursor-pointer hover:bg-[#404040]"
                />
              </form>
            </div>
          )
        ) : (
          <>
            <MatchmakingButton
              text={"Crear sala"}
              onClickHandler={createRoom}
            />
            <MatchmakingButton
              text={"Unirse"}
              onClickHandler={() => setClicked(true)}
            />
          </>
        )}
      </div>
    </AnimatedBackground>
  );
};

export default MatchmakingInterface;
