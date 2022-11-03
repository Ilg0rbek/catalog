import { YooCheckout } from "@a2seven/yoo-checkout";

class PayHelper {
  constructor({ shopId, secretKey, idempotenceKey }) {
    this.checkout = new YooCheckout({ shopId, secretKey });
    this.idempotenceKey = idempotenceKey;
  }
}
