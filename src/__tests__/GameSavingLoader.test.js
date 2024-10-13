import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';
import json from '../parser';

jest.mock('../reader');
jest.mock('../parser');

describe('GameSavingLoader', () => {
  test('should correctly load and parse data', async () => {
    const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < data.length; i++) {
      bufferView[i] = data.charCodeAt(i);
    }

    read.mockResolvedValue(buffer);
    json.mockResolvedValue(data);

    const saving = await GameSavingLoader.load();
    
    expect(saving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
  });

  test('should throw error when reading fails', async () => {
    read.mockRejectedValue(new Error('Read error'));

    await expect(GameSavingLoader.load()).rejects.toThrow('Error loading game saving data');
  });
});
