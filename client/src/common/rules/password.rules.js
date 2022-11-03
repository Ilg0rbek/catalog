
export default [
  { required: true, message: `Пожайлуста, введите пароль` },
  { min: 6, message: `Минимальная длина 6 символов` },
  { max: 64, message: `Максимальная длина 64 символа` },
];
