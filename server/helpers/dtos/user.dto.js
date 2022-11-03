export class UserDto {
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.isActivated = model.activated;
    this.role = model.role;
    this.vkId = model.vkId;
    this.isApproved = model.isApproved;
    this.isBanned = model.isBanned;
    this.promo = model.promo
    this.bonuses = model.bonuses;
  }
}
