import {test, expect, type Locator} from '@playwright/test';

test.describe("basic ui tests", () =>{
    let firstNameInput : Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let addressInput: Locator;
    let createOrderBtn: Locator;

    test.beforeEach(async ({page}) => {
        await page.goto("https://basic-ui.tl-academy.ee/");
        firstNameInput = page.getByTestId("first-name-input");
        lastNameInput = page.getByTestId("last-name-input");
        emailInput = page.getByTestId("email-input");
        addressInput = page.getByTestId("address-input");
        createOrderBtn = page.getByTestId("create-order-button");
    });

    test('TL-16-1 create order button test', async ({ page }) => {

        await expect(createOrderBtn).toBeDisabled();
        await firstNameInput.fill("Test");
        await lastNameInput.fill("Test");
        await emailInput.fill("test@test.test");
        await addressInput.fill("Test");
        await expect(createOrderBtn).toBeEnabled();

    });

    test('TL-16-2 change language', async ({ page }) => {
        const langBtnEN = page.getByTestId("language-en");
        const langBtnRU = page.getByTestId("language-ru");
        const heading = page.getByTestId("page-title");
        const testData = {
            createOrderRu: "Создать заказ",
            createOrderEn: "Create order"
        };

        await langBtnRU.click();
        await expect(heading).toHaveText(testData.createOrderRu);
        expect(await heading.innerText()).toBe(testData.createOrderRu);
        await langBtnEN.click();
        await expect(heading).toHaveText(testData.createOrderEn);
    });

    test('TL-16-3 incorrect email blocks create button and shows error', async ({ page }) => {
        const emailErrorBlock = page.getByTestId("email-error");

        await expect(createOrderBtn).toBeDisabled();
        await firstNameInput.fill("Test");
        await lastNameInput.fill("Test");
        await addressInput.fill("Test");
        await emailInput.fill("test@test");
        await emailInput.blur();
        await expect(emailErrorBlock).toBeVisible();
        await expect(createOrderBtn).not.toBeEnabled();
    });
});