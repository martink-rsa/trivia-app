"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const index_1 = require("../index");
const utils_1 = require("../utils/utils");
const room_model_1 = require("../models/room.model");
class Game {
    constructor(config) {
        this.timer = null;
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
    checkAllPlayersFinished() {
        const allPlayersFinished = this.players.findIndex((player) => !player.finished);
        return allPlayersFinished === -1;
    }
    /**
     * Checks if the player has finished the game
     * @param player The player's details
     */
    async setPlayerFinished(player) {
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
            index_1.serverIo.to(this.roomName).emit('updateScore', score);
            index_1.serverIo.to(this.roomName).emit('updateGameState', 'SCORE');
            // Clearing the game:
            // 1. Delete all players
            // 2. Delete room
            // 3. Delete game obj
            this.players.forEach(async (player) => {
                await user_model_1.User.deleteOne({ _id: player._id });
            });
            await room_model_1.Room.deleteOne({ name: this.roomName });
            delete index_1.games[this.roomId];
        }
        else {
            const playersInProgress = this.players
                .filter((player) => !player.finished)
                .map((player) => ({
                _id: player._id,
                username: player.username,
                iconId: player.iconId,
                colorId: player.colorId,
            }));
            index_1.serverIo.to(player.socketId).emit('updateGameState', 'WAITING');
            index_1.serverIo.to(this.roomName).emit('updatePlayersInProgress', playersInProgress);
        }
    }
    /**
     * Starts a question timer for a player
     * @param duration When the timer ends, in seconds
     * @param player The player's details
     */
    startQuestionTimer(duration, player) {
        player.answers[player.currentQuestion].startTime = Date.now();
        player.timer = setTimeout(() => {
            this.endQuestionTimer(player);
        }, duration);
    }
    /**
     * Ends a question timer for a single player
     * @param player The player's details
     */
    endQuestionTimer(player) {
        // Check if all the questions have been answered, then
        //    either send another question or mark player as finished
        if (player.currentQuestion < this.questions.length - 1) {
            player.currentQuestion += 1;
            this.handleQuestion(player);
        }
        else {
            this.setPlayerFinished(player);
        }
    }
    /**
     * Shuffles the answers to a question, records the correct question and then
     * sends the question to the player
     * @param player The player's details
     */
    handleQuestion(player) {
        // Shuffle the answers with the correct answer
        const answers = utils_1.shuffleFisherYates([
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
        player.answers[player.currentQuestion].correctAnswer = answers.indexOf(this.questions[player.currentQuestion].correctAnswer);
        index_1.serverIo.to(player.socketId).emit('updateQuestion', questionData);
        this.startQuestionTimer(this.questionDuration, player);
    }
    /**
     * Handle the answer of a player by deleting the timer for their question then
     * firing a new question if they are not finished
     * @param playersAnswer The player's answer that is an integer
     * @param playerId The id of the player so the correct player can be attributed
     */
    handleAnswer(playersAnswer, playerId) {
        // Steps:
        // 1. Cancel the timer
        // 2. Mark the question (Optional, not currently doing this as we mark everything at once)
        // 3. Start a new question
        const playerIndex = this.players.findIndex((player) => player._id.toString() === playerId.toString());
        const player = this.players[playerIndex];
        // Cancelling the timer
        player.answers[player.currentQuestion].endTime = Date.now();
        if (player.timer) {
            clearTimeout(player.timer);
        }
        // Add the players answer to their answers. Do not need to mark answers atm,
        //    they can be marked on the game over screen. If one wanted to answer after each
        //    question, they could do so here
        player.answers[player.currentQuestion].playersAnswer = playersAnswer;
        if (player.currentQuestion < this.questions.length - 1) {
            player.currentQuestion += 1;
            this.handleQuestion(player);
        }
        else {
            this.setPlayerFinished(player);
        }
    }
    handlePlayerLeaving(playerId) {
        const playerIndex = this.players.findIndex((player) => player._id.toString() === playerId.toString());
        const player = this.players[playerIndex];
        this.setPlayerFinished(player);
    }
    /**
     * Start the game for all players
     */
    startGame() {
        this.players.forEach((player) => {
            this.handleQuestion(player);
        });
    }
    /**
     * Returns a list of all players, only used for testing
     */
    getPlayers() {
        return this.players;
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map