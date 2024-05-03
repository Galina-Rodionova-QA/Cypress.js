import * as data from "../helpers/default_data.json"

import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка цвета кнопки восст.пароль 
          });

   afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Проверка что крестик видимый
        });

   it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели логин
        cy.get(main_page.password).type(data.password); // Ввели пароль
        cy.get(main_page.login_button).click(); // Клик войти
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден
        cy.get(result_page.title).contains('Авторизация прошла успешно') // Совпадение текста
    })

   it('Работа функции восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Клик забыли пароль
        cy.get(recovery_page.email).type(data.login); // Ввели почту для восстановления пароля
        cy.get(recovery_page.send_button).click(); // Клик отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail') // Совпадение текста
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден       
    }) 

   it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели логин
        cy.get(main_page.login_button).should('be.disabled'); // Кнопка войти некликабельная
        cy.get(main_page.password).type('iLoveqastudio5'); // Ввели неверный пароль
        cy.get(main_page.login_button).should('be.visible'); // Кнопка войти кликабельная
        cy.get(main_page.login_button).click(); // Клик войти
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Совпадение текста
    })

   it(' Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnik.ru'); // Ввели неверный логин
        cy.get(main_page.login_button).should('be.disabled'); // Кнопка войти некликабельная
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).should('be.visible'); // Кнопка войти кликабельная
        cy.get(main_page.login_button).click(); // Клик войти
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Совпадение текста
    })

   it(' Логин без @ и верный пароль', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели логин без @
        cy.get(main_page.login_button).should('be.disabled'); // Кнопка войти некликабельная
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).should('be.visible'); // Кнопка войти кликабельная
        cy.get(main_page.login_button).click(); // Клик войти
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Совпадение текста
    })

   it(' Логин с символами из верхнего регистра и верный пароль', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели логин с символами из верхнего регистра
        cy.get(main_page.login_button).should('be.disabled'); // Кнопка войти некликабельная
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).should('be.visible'); // Кнопка войти кликабельная
        cy.get(main_page.login_button).click(); // Клик войти
        cy.get(result_page.title).should('be.visible'); // Проверка что текст виден
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Совпадение текста
    })

})