declare type Config = {
    roomName: string;
    questions: any[];
    topic: string;
    numQuestions: number;
    players: any[];
};
declare type Answer = {
    question: number;
    correctAnswer: null | number;
    playersAnswer: null | number;
};
declare type Player = {
    _id: string;
    username: string;
    socketId: string;
    currentQuestion: number;
    answers: Answer[];
    timer: null | ReturnType<typeof setTimeout>;
    finished: boolean;
};
declare class Game {
    questions: any[];
    roomName: string;
    topic: string;
    numQuestions: number;
    questionIndex: number;
    timer: null | ReturnType<typeof setInterval>;
    players: Player[];
    constructor(config: Config);
    /**
     * Check that all the players have finished the game
     * @returns {boolean} Whether or not all players have finished
     */
    checkAllPlayersFinished(): boolean;
    /**
     * Checks if the player has finished the game
     * @param player The player's details
     */
    setPlayerFinished(player: any): void;
    /**
     * Starts a question timer for a player
     * @param duration When the timer ends, in seconds
     * @param player The player's details
     */
    startQuestionTimer(duration: number, player: any): void;
    /**
     * Ends a question timer for a single player
     * @param player The player's details
     */
    endQuestionTimer(player: any): void;
    /**
     * Shuffles the answers to a question, records the correct question and then
     * sends the question to the player
     * @param player The player's details
     */
    handleQuestion(player: any): void;
    /**
     * Handle the answer of a player by deleting the timer for their question then
     * firing a new question if they are not finished
     * @param playersAnswer The player's answer that is an integer
     * @param playerId The id of the player so the correct player can be attributed
     */
    handleAnswer(playersAnswer: number, playerId: any): void;
    /**
     * Start the game for all players
     */
    startGame(): void;
    /**
     * Returns a list of all players, only used for testing
     */
    getPlayers(): Player[];
}
export default Game;
