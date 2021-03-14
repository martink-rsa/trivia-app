import { serverIo } from '../index';

class Game {
  questions: any[];
  roomName: string;
  topic: string;
  numQuestions: number;
  questionIndex: number;
  timer: null | ReturnType<typeof setInterval> = null;
  players: any;

  constructor(
    roomName: string,
    questions: any[],
    topic: string,
    numQuestions: number,
    players: any,
  ) {
    this.roomName = roomName;
    this.questions = questions;
    this.numQuestions = numQuestions;
    this.topic = topic;
    this.questionIndex = 0;
    this.players = players.map((player) => {
      return {
        _id: player._id,
        username: player.username,
        socketId: player.socketId,
        currentQuestion: 0,
        timer: null,
      };
    });
  }

  questionTimerFinish(player: any): void {
    console.log('QUESTION TIMER FINISHED');
    if (player.currentQuestion < this.questions.length) {
      console.log('Player has more questions');
      player.currentQuestion += 1;
      serverIo.to(player.socketId).emit('testMsg', 'This is to a player socket id');
      // NEXT:
      // 1. Mark player's question
      // 2. Emit next question
      // 2.1 Get randomization going for the answers which mixes correct and incorrect
      //    answers
      this.handleQuestion(player);
    } else {
      console.log('PLAYER HAS NO MORE QUESTIONS!');
      console.log('GAME OVER');
    }
  }

  startQuestionTimer(duration: number, player: any): void {
    setTimeout(() => {
      console.log('Setting startQuestionTimer timeout, player: ', player);
      this.questionTimerFinish(player);
    }, duration);
  }

  handleQuestion(player: any): void {
    serverIo.to(player.socketId).emit('testMsg', 'This is a test message being sent');
    serverIo
      .to(player.socketId)
      .emit('updateQuestion', this.questions[player.currentQuestion]);
    this.startQuestionTimer(2000, player);
  }

  startGame(): void {
    console.log('GAME CLASS CREATED, LIST OF PLAYERS:');
    console.log(this.players);
    // this.init();
    this.players.forEach((player) => {
      // this.startQuestionTimer(2000, player);
      this.handleQuestion(player);
    });
  }

  getPlayers(): void {
    return this.players;
  }
}

export default Game;
