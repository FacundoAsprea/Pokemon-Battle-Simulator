import { Injectable } from "@nestjs/common";
import { Attack } from "./types";
import { randomInt } from "crypto";

@Injectable()
export class AttackService {
    checkAccuracy(attack: Attack) {
        const random = randomInt(0, 100)
        return attack.move.accuracy < random
    }   

}