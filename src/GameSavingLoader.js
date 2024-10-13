import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const parsedData = await json(data);
      const gameSaving = JSON.parse(parsedData);
      return new GameSaving(gameSaving);
    } catch (error) {
      throw new Error('Error loading game saving data');
    }
  }
}
