import axios from "axios";

export class IpService {
  private url = "http://localhost:3200/ip";

  async getIp() {
    return await axios.get<string>(this.url);
  }
}
