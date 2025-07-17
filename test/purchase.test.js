const { sweetShop } = require("../src/sweetShop");

describe("Purchase Sweets", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  test("reduces quantity when a sweet is purchased", () => {
    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Dry Fruit",
      price: 50,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    sweetShop.purchaseSweet(1, 3);
    const result = sweetShop.getAllSweets().find((s) => s.id === 1);
    expect(result.quantity).toBe(7);
  });

  test("throws error when sweet does not exist", () => {
    expect(() => sweetShop.purchaseSweet(999, 2)).toThrow("Sweet not found");
  });

  test("throws error when purchasing more than available quantity", () => {
    const sweet = {
      id: 2,
      name: "Peda",
      category: "Milk",
      price: 30,
      quantity: 5,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.purchaseSweet(2, 10)).toThrow(
      "Not enough quantity in stock"
    );
  });

  test("throws error when purchasing zero quantity", () => {
    const sweet = {
      id: 3,
      name: "Jalebi",
      category: "Fried",
      price: 25,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.purchaseSweet(3, 0)).toThrow(
      "Invalid purchase amount"
    );
  });

  test("throws error when purchasing negative quantity", () => {
    const sweet = {
      id: 4,
      name: "Rasgulla",
      category: "Milk",
      price: 20,
      quantity: 12,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.purchaseSweet(4, -5)).toThrow(
      "Invalid purchase amount"
    );
  });

  test("purchase exactly all remaining stock (quantity becomes 0)", () => {
    const sweet = {
      id: 5,
      name: "Barfi",
      category: "Milk",
      price: 40,
      quantity: 5,
    };
    sweetShop.addSweet(sweet);

    sweetShop.purchaseSweet(5, 5);
    const result = sweetShop.getAllSweets().find((s) => s.id === 5);
    expect(result.quantity).toBe(0);
  });
});
