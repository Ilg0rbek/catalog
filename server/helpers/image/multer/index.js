import multer from "multer";
import path from "path";
import { errorEnum } from "../../../common/enums";
import { ApiError } from "../../../exeptions/api-error";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}${path.extname(file.originalname)}`
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new ApiError.BadRequest(errorEnum.INVALID_IMAGE_TYPES), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
export const multerUploadOne = (name) => {
  return upload.single(name);
};
