const dotenv = require("dotenv");
const express = require('express');
const axios = require("axios");
const app = express();
dotenv.config();

/*
 * payment-001 - тариф на год
 * payment-002 - тариф на месяц
 */

const {
  YMPaymentFromBuilder,
  YMFormPaymentType,
  YMNotificationChecker,
  YMNotificationError
} = require("yoomoney-sdk");

const notificationChecker = new YMNotificationChecker(process.env.YOOMONEY_SECRET);

const port = parseInt(process.env.YOOMONEY_PORT);

app.get("/pay/:sum/:user", (_req, res) => {
  const num = _req.params.sum;
  const user = _req.params.user;

  let comment = 'Подписка на год.';
  let paymentType = 'payment-001';

  if (num == 99) {
      comment = 'Подписка на месяц.';
      paymentType = 'payment-002';
  }

  const builder = new YMPaymentFromBuilder({
    quickPayForm: "shop",
    sum: Number(num).toFixed(2),
    successURL: `${process.env.CLIENT_URL}`,
    paymentType: YMFormPaymentType.FromCard,
    receiver: "4100117398430156",
    label: paymentType + "#" + user,
    comment,
    targets: comment
  });

  res.writeHead(200, "OK", {
    "Content-Type": "text/html; charset=utf-8"
  });

  res.end(builder.buildHtml(true)); // true = делаем полную страничку, а не только форму
});

const configHeaders = {
  "content-type": "application/json; charset=utf-8",
  "Accept": "application/json, text/plain, */*"
};

app.get("/success", (_req, res) => {
  res.end('Спасибо за покупку!');
});

// УВЕДОМЛЕНИЯ

// Идём на https://yoomoney.ru/transfer/myservices/http-notification
// И вписываем туда этот URL на домене, чтобы получить уведомления.
// Секрет для проверки подлинности от туда делаем переменной окружения
// см. 14 строку

// Пример DEV: https://aboba.ngrok.io/yoomoney/secret-path/notification
// Пример PROD: https://myshop.ru/yoomoney/secret-path/notification
 

function setBonusToRefer(referer, bonus) {

axios({
    url: `${process.env.APP_URL}/users/yoomoney/get/${referer}`,
    method: "get",
  })
 .then(response => {

      const bonuses = parseInt(response.data.bonuses) + bonus;

      axios({
        url: `${process.env.APP_URL}/users/yoomoney/update/${referer}`,
        method: "PUT",
        data: {
             data: { bonuses: bonuses }
        },
        headers: configHeaders
     });

  });
}

app.post(
  "/notification",
  // Параметр `memo=false` отключает запоминание обработанных уведомлений
  // Он по умолчанию включён, но для тестирования на localhost'е
  // где вы можете кидать одно и то же уведомление несколько раз
  // лучше выключить
  notificationChecker.middleware({ memo: true }, (req, res) => {
      const memoLabel = req.body.label.split('#')
      const paymentType = memoLabel[0];
      const user = memoLabel[1];

      let bonus = 500;
      const currentDate = new Date();
      if (paymentType === 'payment-001') {
          currentDate.setFullYear(currentDate.getFullYear() + 1);
      } else {
          currentDate.setMonth(currentDate.getMonth() + 1);
          bonus = 100;
      }

      axios({
          url: `${process.env.APP_URL}/users/yoomoney/get/${user}`,
          method: "get",
      })
          .then(response => {
              response.data.isApproved = true;
              response.data.approveExpire = currentDate.getTime();
              const referer = response.data.referer;
              if (referer != null && typeof referer != 'undefined') {
                  setBonusToRefer(referer, bonus);
              }

              axios({
                  url: `${process.env.APP_URL}/users/yoomoney/update/${response.data.id}`,
                  method: "PUT",
                  data: {
                      data: {
                          id: response.data.id,
                          isApproved: response.data.isApproved,
                          approveExpire: response.data.approveExpire
                      }
                  },
                  headers: configHeaders
              })

                  .then(response => {
                      console.log('Pay success');
                  })
                  .catch((err) => {
                      console.log('myerror1', err);
                  });
          })
          .catch((err) => {
              console.log('myerror2', err);
          });

      res.writeHead(200, "OK", {"Content-Type": "text/plain"});
      res.end("ok");

  })
);

app.use((error, req, res, next) => {
  if (error instanceof YMNotificationError) {
    console.log(error);
  }

  return next();
});

const start = async function () {
  try {
    app.listen(port, () => {
      console.log(`Server start on ${port} at http://localhost:${port}/`);
    });
  } catch (e) {
    console.log("Error on server setup: ", e);
  }
};

start();
