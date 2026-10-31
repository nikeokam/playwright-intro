import {expect, test, type Locator} from '@playwright/test';

test.describe("basic ui tests", () => {

    let emailInput : Locator;
    let fullNameInput : Locator;
    let deliveryMethodParcelCheckbox : Locator;
    let deliveryMethodHomeCheckbox : Locator;
    let deliveryConst  : Locator;
    let totalSum : Locator;
    let placeOrderBtn : Locator;
    let placeOrderMsg : Locator;

    test.beforeEach(async ({page}) => {
        await page.goto("https://shop.tl-academy.ee/checkout");
        emailInput = page.getByPlaceholder("Email address")
        fullNameInput = page.getByTestId("name-input");
        deliveryMethodParcelCheckbox = page.getByTestId("delivery-parcel-locker-option");
        deliveryMethodHomeCheckbox = page.getByTestId("delivery-home-option");
        deliveryConst = page.getByTestId("summary-delivery");
        totalSum = page.locator("#total")
        placeOrderBtn = page.locator("button.place");
        placeOrderMsg = page.getByTestId("order-message");
    });

    test('TL-16-4 place order button test with delivery check + validation', async ({ page }) => {

        const testData = {
            deliveryCost: "€5.99",
            totalCost: "€84.99",
            orderMsg: "Order placed. Thank you!"
        };

        await emailInput.fill("test@test.test");
        await fullNameInput.fill("Test Test");
        await deliveryMethodHomeCheckbox.check();

        await expect(deliveryMethodHomeCheckbox).toBeAttached();
        await expect(deliveryMethodHomeCheckbox).toBeVisible();
        await expect(deliveryMethodParcelCheckbox).not.toBeChecked()
        await expect(deliveryConst).toHaveText(testData.deliveryCost);
        await expect(totalSum).toHaveText(testData.totalCost);

        await placeOrderBtn.click();
        await expect(placeOrderMsg).toBeVisible()
        await expect(placeOrderMsg).toHaveText(testData.orderMsg);

    });

    test('TL-16-5 fill incorrect full name format', async ({ page }) => {
        const nameError = page.getByTestId("name-error");
        const testData = {
            invalidNameMsg: "Enter your first and last name separated by a space, for example Anna Tamm",
        };

        await fullNameInput.fill("fgeytneyn");
        await fullNameInput.blur();

        await expect(nameError).toBeVisible();
        await expect(nameError).toHaveText(testData.invalidNameMsg);

    });
});