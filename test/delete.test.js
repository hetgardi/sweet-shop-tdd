const { sweetShop } = require("../src/sweetShop");

describe("Delete Sweet", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  test("deletes a sweet by ID", () => {
    const sweet = {
      id: 1,
      name: "Barfi",
      category: "Milk",
      price: 30,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    sweetShop.deleteSweet(1);

    const sweets = sweetShop.getAllSweets();
    expect(sweets).toHaveLength(0);
  });

  test("throws error when deleting a non-existent sweet", () => {
    expect(() => sweetShop.deleteSweet(999)).toThrow("Sweet not found");
  });

  test("deletes the correct sweet when multiple are present", () => {
    const sweet1 = {
      id: 1,
      name: "Peda",
      category: "Milk",
      price: 25,
      quantity: 15,
    };
    const sweet2 = {
      id: 2,
      name: "Rasgulla",
      category: "Milk",
      price: 20,
      quantity: 12,
    };

    sweetShop.addSweet(sweet1);
    sweetShop.addSweet(sweet2);

    sweetShop.deleteSweet(1);

    const sweets = sweetShop.getAllSweets();
    expect(sweets).toHaveLength(1);
    expect(sweets[0].id).toBe(2);
  });

  test("deletes all sweets one by one", () => {
    const sweets = [
      { id: 1, name: "Ladoo", category: "Gram", price: 20, quantity: 10 },
      { id: 2, name: "Imarti", category: "Fried", price: 15, quantity: 5 },
    ];

    sweets.forEach((sweet) => sweetShop.addSweet(sweet));

    sweetShop.deleteSweet(1);
    sweetShop.deleteSweet(2);

    expect(sweetShop.getAllSweets()).toHaveLength(0);
  });
});
