import type { SpriteData } from "@/types";
import axios from "axios";

export class SpritesService {
  private url = "http://localhost:3200/pokemon/sprites";

  async getAllSprites() {
    return await axios.get<SpriteData[]>(this.url);
  }

  async getSprite(id: string) {
    return await axios.get<SpriteData>(this.url + id.toString());
  }
}
