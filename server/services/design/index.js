export class DesignService {
  constructor({ DesignCardsRepository, DesignCardsSizeTypesRepository }) {
    this.DesignCardsRepository = DesignCardsRepository;
    this.DesignCardsSizeTypesRepository = DesignCardsSizeTypesRepository;
  }

  async getAllCards() {
    const response = await this.DesignCardsRepository.getByFilter();
    return response;
  }

  async setCardById({ id, data }) {
    console.log("setCardById", id, data);
    const candidate = await this.DesignCardsRepository.findOneByParams({
      themeId: id,
    });
    let response = null;
    if (candidate) {
      response = await this.DesignCardsRepository.updateByParams(
        { themeId: id },
        data
      );
    } else {
      response = await this.DesignCardsRepository.create(data);
    }
    return response;
  }

  async getAllCardsSizes() {
    const response = await this.DesignCardsSizeTypesRepository.getAll();
    return response;
  }
  async getCardById({ id }) {
    const response = await this.DesignCardsRepository.getByFilter({ id });
    return response[0];
  }
}
