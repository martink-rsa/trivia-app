import User from '../models/user.model';
import { serverIo, games } from '../index';
import { shuffleFisherYates } from '../utils/utils';
import Room from '../models/room.model';

type Config = {
  roomId: string;
  roomName: string;
  questions: any[];
  topic: string;
  numQuestions: number;
  players: any[];
  questionDuration: number;
};

type Answer = {
  question: number;
  correctAnswer: null | number;
  playersAnswer: null | number;
  startTime: number;
  endTime: number;
};

type Player = {
  _id: string;
  username: string;
  iconId: number;
  colorId: number;
  socketId: string;
  currentQuestion: number;
  answers: Answer[];
  timer: null | ReturnType<typeof setTimeout>;
  finished: boolean;
};

class Game {
  questions: any[];
  roomId: string;
  roomName: string;
  topic: string;
  numQuestions: number;
  questionIndex: number;
  timer: null | ReturnType<typeof setInterval> = null;
  players: Player[];
  questionDuration: number;

  constructor(config: Config) {
    this.roomId = config.roomId;
    this.roomName = config.roomName;
    this.questions = config.questions;
    this.numQuestions = config.numQuestions;
    this.topic = config.topic;
    this.questionIndex = 0;
    this.questionDuration = config.questionDuration;
    this.players = config.players.map((player) => {
      return {
        _id: player._id,
        username: player.username,
        iconId: player.iconId,
        colorId: player.colorId,
        socketId: player.socketId,
        currentQuestion: 0,
        answers: config.questions.map((_, index) => ({
          question: index,
          correctAnswer: null,
          playersAnswer: null,
          startTime: 0,
          endTime: 0,
        })),
        timer: null,
        finished: false,
      };
    });
  }

  /**
   * Check that all the players have finished the game
   * @returns {boolean} Whether or not all players have finished
   */
  checkAllPlayersFinished(): boolean {
    const allPlayersFinished = this.players.findIndex((player) => !player.finished);
    return allPlayersFinished === -1;
  }

  /**
   * Checks if the player has finished the game
   * @param player The player's details
   */
  async setPlayerFinished(player: any): Promise<void> {
    // If player is finished, then:
    // 1. Check if room is finished.
    // 1.1 If room is not finished:
    // 1.1.1 Emit waiting state player
    // 1.1.2 Emit players in progress to room
    // 1.2 If the room is finished: Emit to all players to go
    //    to score screen
    player.finished = true;
    const allPlayersFinished = this.checkAllPlayersFinished();
    if (allPlayersFinished) {
      const score = this.players.map((currentPlayer) => ({
        _id: currentPlayer._id,
        username: currentPlayer.username,
        answers: currentPlayer.answers,
        iconId: currentPlayer.iconId,
        colorId: currentPlayer.colorId,
      }));
      serverIo.to(this.roomName).emit('updateScore', score);
      serverIo.to(this.roomName).emit('updateGameState', 'SCORE');

      // Clearing the game:
      // 1. Delete all players
      // 2. Delete room
      // 3. Delete game obj
      this.players.forEach(async (player) => {
        console.log(player._id);
        await User.deleteOne({ _id: player._id });
      });
      await Room.deleteOne({ name: this.roomName });
      delete games[this.roomId];
    } else {
      const playersInProgress = this.players
        .filter((player) => !player.finished)
        .map((player) => ({
          _id: player._id,
          username: player.username,
          iconId: player.iconId,
          colorId: player.colorId,
        }));
      serverIo.to(player.socketId).emit('updateGameState', 'WAITING');
      serverIo.to(this.roomName).emit('updatePlayersInProgress', playersInProgress);
    }
  }

  /**
   * Starts a question timer for a player
   * @param duration When the timer ends, in seconds
   * @param player The player's details
   */
  startQuestionTimer(duration: number, player: any): void {
    player.answers[player.currentQuestion].startTime = Date.now();
    player.timer = setTimeout(() => {
      this.endQuestionTimer(player);
    }, duration);
  }

  /**
   * Ends a question timer for a single player
   * @param player The player's details
   */
  endQuestionTimer(player: any): void {
    // Check if all the questions have been answered, then
    //    either send another question or mark player as finished
    if (player.currentQuestion < this.questions.length - 1) {
      player.currentQuestion += 1;
      this.handleQuestion(player);
    } else {
      this.setPlayerFinished(player);
    }
  }

  /**
   * Shuffles the answers to a question, records the correct question and then
   * sends the question to the player
   * @param player The player's details
   */
  handleQuestion(player: any): void {
    // Shuffle the answers with the correct answer
    const answers = shuffleFisherYates([
      this.questions[player.currentQuestion].correctAnswer,
      ...this.questions[player.currentQuestion].falseAnswers,
    ]);
    // Create the final question object to send to player
    const questionData = {
      questionNumber: player.currentQuestion + 1,
      question: this.questions[player.currentQuestion].question,
      answers,
      questionDuration: this.questionDuration,
    };
    // Set the correct answer for marking later
    player.answers[player.currentQuestion].correctAnswer = answers.indexOf(
      this.questions[player.currentQuestion].correctAnswer,
    );

    serverIo.to(player.socketId).emit('updateQuestion', questionData);
    this.startQuestionTimer(this.questionDuration, player);
    console.log(player);
  }

  /**
   * Handle the answer of a player by deleting the timer for their question then
   * firing a new question if they are not finished
   * @param playersAnswer The player's answer that is an integer
   * @param playerId The id of the player so the correct player can be attributed
   */
  handleAnswer(playersAnswer: number, playerId: any): void {
    // Steps:
    // 1. Cancel the timer
    // 2. Mark the question (Optional, not currently doing this as we mark everything at once)
    // 3. Start a new question
    const playerIndex = this.players.findIndex(
      (player) => player._id.toString() === playerId.toString(),
    );
    const player = this.players[playerIndex];

    // Cancelling the timer
    player.answers[player.currentQuestion].endTime = Date.now();
    clearTimeout(player.timer);

    // Add the players answer to their answers. Do not need to mark answers atm,
    //    they can be marked on the game over screen. If one wanted to answer after each
    //    question, they could do so here
    player.answers[player.currentQuestion].playersAnswer = playersAnswer;

    if (player.currentQuestion < this.questions.length - 1) {
      player.currentQuestion += 1;
      this.handleQuestion(player);
    } else {
      this.setPlayerFinished(player);
    }
  }

  handlePlayerLeaving(playerId): void {
    console.log('Game: Handle player leaving');
    const playerIndex = this.players.findIndex(
      (player) => player._id.toString() === playerId.toString(),
    );
    const player = this.players[playerIndex];
    console.log(player);
    this.setPlayerFinished(player);
  }

  /**
   * Start the game for all players
   */
  startGame(): void {
    this.players.forEach((player) => {
      this.handleQuestion(player);
    });
  }

  /**
   * Returns a list of all players, only used for testing
   */
  getPlayers(): Player[] {
    return this.players;
  }
}

export default Game;
