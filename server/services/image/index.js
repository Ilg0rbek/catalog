export class ImageService {
  constructor({ ImageRepository }) {
    this.ImageRepository = ImageRepository;
  }

  async addImage({ name, isDefault = false }) {
    return this.ImageRepository.create({ name, default: isDefault });
  }
  async setDefaultImage({ id }) {
    await this.ImageRepository.updateByParams(
      { default: true },
      { default: false }
    );
    return this.ImageRepository.updateByParams({ id }, { default: true });
  }
  async getDefaultImage() {
    return this.ImageRepository.findOneByParams({ default: true });
  }
}
