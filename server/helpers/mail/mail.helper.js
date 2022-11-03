import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sendpulse from "sendpulse-api";

var API_USER_ID = "c50a265de8b8e5320fc6551187f24e62";
var API_SECRET = "74b562f100b3f4e5f9f82d2ceca49fa8";
var TOKEN_STORAGE = "/tmp/";

dotenv.config();

class MailHelper {
  constructor() {}

  async sendActivationMail(email, activatedLink) {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
      if (token && token.is_error) {
        // error handling
      }


      /**
       * Function to process response data
       *
       * @param data
       */
      var answerGetter = function (data) {
        console.log(data);
      };
      var emailConfig = {
        html: `<div><h1>Подтверждение почты</h1><h3>Что бы подтвердить почту перейдите по ссылке ниже</h3><a href="${activatedLink}">${activatedLink}</a></div>`,
        subject: "Подтверждение почты на сайте Memoria",
        from: {
          name: "Мнемория",
          email: "mail@memorialanguage.ru",
        },
        to: [
          {
            email: email,
          },
        ],
      };
      sendpulse.smtpSendMail(answerGetter, emailConfig);
    });
  }
  
 async sendYoomoneylink(email, yoomoneyLink) {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
      if (token && token.is_error) {
        // error handling
      }


      /**
       * Function to process response data
       *
       * @param data
       */
      var answerGetter = function (data) {
        console.log(data);
      };
      var emailConfig = {
        html: `<div><h1>Закончите оформление подписки</h1><h3>Для оплаты перейдите по ссылке:</h3><a href="${yoomoneyLink}">${yoomoneyLink}</a></div>`,
        subject: "Оформление подписки на сайте Memoria",
        from: {
          name: "Мнемория",
          email: "mail@memorialanguage.ru",
        },
        to: [
          {
            email: email,
          },
        ],
      };
      sendpulse.smtpSendMail(answerGetter, emailConfig);
    });
  }

async cashoutRequest(data) {
    sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, function (token) {
      if (token && token.is_error) {
        // error handling
      }


      /**
       * Function to process response data
       *
       * @param data
       */
      var answerGetter = function (data) {
        console.log(data);
      };
      var emailConfig = {
        html: `<div>Пользователь ${data.email} запросил выплату ${data.bonuses} руб.</div>`,
        subject: `Пользователь ${data.email} запросил выплату ${data.bonuses} руб.`,
        from: {
          name: "Мнемория",
          email: "mail@memorialanguage.ru",
        },
        to: [
          {
            email: "project-england@yandex.ru",
          },
        ],
      };
      sendpulse.smtpSendMail(answerGetter, emailConfig);
    });
  }

}

export const mailHelper = new MailHelper();
