import { multerUploadOne } from "../../helpers/image";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { ImagesController } = controllers;

  const { responseMiddleware, authMiddleware, adminAuthMiddleware } =
    middlewares;

  //get all plain users
  router.post(
    "/",
    multerUploadOne("image"),
    (req, res, next) => ImagesController.addImage(req, res, next),
    responseMiddleware
  );

  router.put(
    "/:id",
    (req, res, next) => ImagesController.setImage(req, res, next),
    responseMiddleware
  );
  router.get(
    "/default",
    (req, res, next) => ImagesController.getDefaultImage(req, res, next),
    responseMiddleware
  );
  return router;
};
