import { Injectable } from '@nestjs/common';
import os from 'os';

@Injectable()
export class IpService {
  getIp(): string | null {
    const nets = os.networkInterfaces();

    for (const name of Object.keys(nets)) {
      for (const net of nets[name] ?? []) {
        if (net.family == 'IPv4' && !net.internal) return net.address;
      }
    }

    return null;
  }
}
