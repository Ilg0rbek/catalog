export class WordService {
  constructor({ WordsRepository }) {
    this.WordsRepository = WordsRepository;
  }
  async addWord(wordId) {
    return this.WordsRepository.create({ wordId });
  }
  async checkWordOnExists(wordId) {
    const response = await this.WordsRepository.findOneByParams({ wordId });
    return { isExists: !!response, word: response };
  }
  async getAll() {
    return this.WordsRepository.getAll();
  }
}
