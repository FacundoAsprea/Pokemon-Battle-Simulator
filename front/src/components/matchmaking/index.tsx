import { useState, useRef } from "react";
import AnimatedBackground from "../animatedBackground";
import MatchmakingButton from "./button";
import { IpService } from "@/services/ip.service";
import { webSocket } from "@/services/websocket.service";

const MatchmakingInterface = () => {
  const playerName = useRef("");
  const [ip, setIp] = useState<string>();
  const [joinRoomIp, setJoinRoomIp] = useState<string>("");
  const [clicked, setClicked] = useState(false);

  const createRoom = async () => {
    setClicked(true);
    if (!playerName.current) return
    const ipService = new IpService();

    const { data } = await ipService.getIp();
    setIp(data);

    webSocket.startConnection(data, { name: playerName.current });
    webSocket.waitForBattle();
    webSocket.joinRoom();
  };

  const joinRoom = (ip: string) => {
    webSocket.startConnection(ip, { name: playerName.current });
    webSocket.waitForBattle();
    webSocket.joinRoom();
  };

  const disconnect = () => {
    console.log("DESCONECTANDO DEL WEBS...");
    webSocket.disconnect();
  };

  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center gap-5 h-screen w-[70dvw] bg-background z-2">
        {clicked ? (
          playerName.current ? (
            ip ? (
              <div className="flex flex-col items-center justify-center gap-2 relative h-full w-full">
                <a
                  className="bg-[#404040] px-3 py-1 text-white rounded-sm absolute top-1/8 left-1/8 cursor-pointer"
                  onClick={disconnect}
                  href="matchmaking"
                >
                  {"<"}
                </a>
                <p className="text-white">Sala creada con la IP: {ip}</p>
                <p className="text-white">Esperando a la conexion LAN...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 relative h-full w-full">
                <a
                  className="bg-[#404040] px-3 py-1 text-white rounded-sm absolute top-1/8 left-1/8 cursor-pointer"
                  onClick={disconnect}
                  href="matchmaking"
                >
                  {"<"}
                </a>
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
              <p className="text-red-500">Ingresa un nombre de usuario</p>
              <a
                className="bg-[#404040] px-3 py-1 text-white rounded-sm cursor-pointer"
                href="matchmaking"
              >
                {"<"}
              </a>
            </>
          )
        ) : (
          <>
            <input
              placeholder="Nombre..."
              className="w-1/2 p-3 text-gray-200 bg-[#303030] rounded-sm border-1 border-gray-300"
              onChange={(event) => {
                event.preventDefault();
                playerName.current = event.target.value;
                console.log("NAME: ", playerName.current);
              }}
            ></input>
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
