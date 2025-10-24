import type { Type } from "@shared/types/battledata";

interface TypeUIData {
  sprite: string;
  color: string;
}

export const TypeUICollection: Record<Type, TypeUIData> = {
  normal: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/1.png",
    color: "#9ca3ad",
  },
  fighting: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/2.png",
    color: "#511011",
  },
  flying: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/3.png",
    color: "#B2B2B3",
  },
  poison: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/4.png",
    color: "#472172",
  },
  ground: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/5.png",
    color: "#57423F",
  },
  rock: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/6.png",
    color: "#887A77",
  },
  bug: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/7.png",
    color: "#7B731B",
  },
  ghost: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/8.png",
    color: "#301A8E",
  },
  steel: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/9.png",
    color: "#2E3B41",
  },
  fire: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/10.png",
    color: "#BD370C",
  },
  water: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/11.png",
    color: "#217BCB",
  },
  grass: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/12.png",
    color: "#7BB243",
  },
  electric: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/13.png",
    color: "#F8D63A",
  },
  psychic: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/14.png",
    color: "#B11E54",
  },
  ice: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/15.png",
    color: "#5F93BB",
  },
  dragon: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/16.png",
    color: "#1B0931",
  },
  dark: {
    sprite:
      "https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/types/generation-iv/platinum/17.png",
    color: "#2B2A2A",
  },
  fairy: {
    sprite: "http://localhost:3200/images/Fairy_Type_Sprite.png",
    color: "#EEA5BF",
  },
};