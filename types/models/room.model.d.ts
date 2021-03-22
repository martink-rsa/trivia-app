import * as mongoose from 'mongoose';
import Game from '../utils/game';
export interface IRoom extends mongoose.Document {
    name: string;
    admin: mongoose.Schema.Types.ObjectId;
    users: mongoose.Schema.Types.ObjectId[];
    topic: string;
    game: Game;
}
declare const Room: mongoose.Model<IRoom>;
export default Room;
