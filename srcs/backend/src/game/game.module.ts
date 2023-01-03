import { Module } from '@nestjs/common';
import { GameSocketIOService } from './game.services';

@Module({
    providers: [GameSocketIOService],
    exports: [GameSocketIOService]
})
export class GameSocketIOModule {}
