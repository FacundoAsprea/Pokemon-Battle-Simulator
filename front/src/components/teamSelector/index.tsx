import { useState, useEffect, useRef, useContext } from "react";
import { SpritesService } from "@/services/sprite.service";
import type { SpriteData } from "@/types";
import type { BattleContextType } from "@/contexts/battleContext";
import PokeCard from "./pokecard";
import AnimatedBackground from "../animatedBackground";
import { Link } from "react-router-dom";
import { BattleContext } from "@/contexts/battleContext";
import { PokemonDataService } from "@/services/pokemondata.service";

const TeamSelector = () => {
  const { localBattleState, setLocalBattleState } = useContext(
    BattleContext
  ) as BattleContextType
  const allSprites = useRef<SpriteData[]>([]);
  const [sprites, setSprites] = useState<SpriteData[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<SpriteData[]>([]);
  const SpriteService = new SpritesService();

  const getPokemonBattleData = async () => {
    const dataService = new PokemonDataService()
    return await dataService.getPokemonDataFromTeam(selectedTeam)
  }

  useEffect(() => {
    SpriteService.getAllSprites().then((fetchedSprites) => {
      setSprites(fetchedSprites.data);
      allSprites.current = fetchedSprites.data;
    });
  }, []);

  useEffect(() => {
    if (selectedTeam.length == 6) {
      getPokemonBattleData()
        .then(data => {
          data[0].selected = true   //EL PRIMER POKEMON ELEGIDO ES EL PRIMERO EN ENTRAR EN COMBATE
          setLocalBattleState({
            ...localBattleState,
            team: data
          })
        })
    }
  }, [selectedTeam])

  const addToTeam = (pokemon: SpriteData) => {
    if (selectedTeam.length == 6) return;

    setSelectedTeam([...selectedTeam, pokemon]);
    setSprites(
      sprites.filter((selectedPokemon) => selectedPokemon.id != pokemon.id)
    );
  };

  const deleteFromTeam = (pokemon: SpriteData) => {
    const selectedPokemonsModified = selectedTeam.filter(
      (selectedPokemon) => selectedPokemon.id != pokemon.id
    );
    setSelectedTeam(selectedPokemonsModified);
    setSprites(
      allSprites.current.filter(
        (sprite) =>
          !selectedPokemonsModified.find(
            (selectedPokemon) => selectedPokemon.id == sprite.id
          )
      )
    );
  };

  return (
    <AnimatedBackground>
      <div className="py-10 flex flex-col items-center justify-start gap-5 h-full w-[70dvw] bg-background z-2">
        <p className="text-white text-xl text-center">
          Forma tu equipo de 6 Pokemones
        </p>

        {/* EQUIPO SELECCIONADO */}
        <div
          style={{ scrollbarWidth: "thin" }}
          className="relative grid grid-cols-6 grid-rows-1 gap-x-3"
        >
          {selectedTeam.length == 6 ? (
            <Link
              to="/matchmaking"
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            >
              <button
                className=" cursor-pointer p-2 text-2xl text-gray-100 bg-[#95e444] hover:bg-[#73c222] border-1 border-white"
              >
                Jugar
              </button>
            </Link>
          ) : (
            <></>
          )}
          {selectedTeam[0] ? (
            selectedTeam.map((sprite) => (
              <PokeCard
                size="mini"
                spriteData={sprite}
                onClickHandler={() => deleteFromTeam(sprite)}
              />
            ))
          ) : (
            <></>
          )}
        </div>

        {/* BUSCADOR */}
        <input
          placeholder="Busca un pokemon..."
          className="px-2 text-white text-xl w-1/2 bg-[#404040] rounded-sm ml-2 text-center"
          onChange={(event) => {
            console.log("TEAM: ", selectedTeam);
            return event.target.value == ""
              ? setSprites([
                ...allSprites.current.filter(
                  (sprite) =>
                    !selectedTeam.some(
                      (pokemon) => pokemon.name == sprite.name
                    )
                ),
              ])
              : setSprites(
                allSprites.current.filter((sprite) => {
                  return (
                    sprite.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase()) &&
                    !selectedTeam.some(
                      (pokemon) => pokemon.name == sprite.name
                    )
                  );
                })
              );
          }}
        />

        {/* LISTA DE POKEMONES */}
        <div
          style={{ scrollbarWidth: "thin" }}
          className="py-2 w-full flex items-center justify-center flex-wrap gap-3 overflow-y-scroll"
        >
          {sprites[0] ? (
            sprites.map((sprite) => (
              <PokeCard
                size="normal"
                spriteData={sprite}
                onClickHandler={() => addToTeam(sprite)}
              />
            ))
          ) : (
            <p className="text-white">No se ha encontrado el pokemon</p>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default TeamSelector;
