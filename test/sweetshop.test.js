const SweetShop = require("../src/sweetshop");

describe("SweetShop - addSweet", () => {
  test("should add a sweet to the shop", () => {
    const shop = new SweetShop();

    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };

    shop.addSweet(sweet);

    const sweets = shop.getAllSweets();
    expect(sweets.length).toBe(1);
    expect(sweets[0].name).toBe("Kaju Katli");
  });
});
