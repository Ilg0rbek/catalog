import { ApiError } from "../../exeptions/api-error";

export default async function generalErrorHandlerMiddleware(
  err,
  req,
  res,
  next
) {
  console.log(err);

  if (!res.headersSent) {
    if (err instanceof ApiError) {
      res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: `${err}` });
  } else {
    next(err);
  }
}
