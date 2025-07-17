const { sweetShop } = require("../src/sweetShop");

describe("updateSweet", () => {
  beforeEach(() => {
    sweetShop.reset();
  });

  test("updates price and quantity of an existing sweet", () => {
    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Nut",
      price: 50,
      quantity: 20,
    };
    sweetShop.addSweet(sweet);

    sweetShop.updateSweet(1, { price: 60, quantity: 25 });

    const updated = sweetShop.getAllSweets()[0];
    expect(updated.price).toBe(60);
    expect(updated.quantity).toBe(25);
  });

  test("updates name and category", () => {
    const sweet = {
      id: 2,
      name: "Barfi",
      category: "Milk",
      price: 30,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    sweetShop.updateSweet(2, { name: "Besan Barfi", category: "Gram" });

    const updated = sweetShop.getAllSweets()[0];
    expect(updated.name).toBe("Besan Barfi");
    expect(updated.category).toBe("Gram");
  });

  test("throws error if sweet ID does not exist", () => {
    expect(() => sweetShop.updateSweet(99, { price: 100 })).toThrow(
      "Sweet not found"
    );
  });

  test("throws error if quantity is negative", () => {
    const sweet = {
      id: 3,
      name: "Ladoo",
      category: "Gram",
      price: 25,
      quantity: 5,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.updateSweet(3, { quantity: -5 })).toThrow(
      "Invalid quantity"
    );
  });

  test("throws error if price is negative", () => {
    const sweet = {
      id: 4,
      name: "Jalebi",
      category: "Fried",
      price: 20,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.updateSweet(4, { price: -1 })).toThrow(
      "Invalid price"
    );
  });

  test("throws error for invalid types in update (price as string)", () => {
    const sweet = {
      id: 5,
      name: "Peda",
      category: "Milk",
      price: 20,
      quantity: 10,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.updateSweet(5, { price: "expensive" })).toThrow(
      "Invalid price"
    );
  });

  test("empty updates object should not change anything", () => {
    const sweet = {
      id: 6,
      name: "Soan Papdi",
      category: "Flaky",
      price: 30,
      quantity: 8,
    };
    sweetShop.addSweet(sweet);

    sweetShop.updateSweet(6, {});

    const result = sweetShop.getAllSweets()[0];
    expect(result).toMatchObject(sweet);
  });

  test("does not mutate the input object passed for updates", () => {
    const sweet = {
      id: 7,
      name: "Kalakand",
      category: "Milk",
      price: 40,
      quantity: 12,
    };
    sweetShop.addSweet(sweet);

    const updates = { price: 45 };
    const copy = { ...updates };

    sweetShop.updateSweet(7, updates);
    expect(updates).toEqual(copy);
  });

  // two more test cases that AI suggested
  test("updates quantity and price to 0 (boundary case)", () => {
    const sweet = {
      id: 11,
      name: "Petha",
      category: "Fruit",
      price: 10,
      quantity: 5,
    };
    sweetShop.addSweet(sweet);

    sweetShop.updateSweet(11, { price: 0, quantity: 0 });

    const updated = sweetShop.getAllSweets()[0];
    expect(updated.price).toBe(0);
    expect(updated.quantity).toBe(0);
  });

  test("throws error when name is empty or whitespace", () => {
    const sweet = {
      id: 8,
      name: "Chikki",
      category: "Nut",
      price: 20,
      quantity: 5,
    };
    sweetShop.addSweet(sweet);

    expect(() => sweetShop.updateSweet(8, { name: " " })).toThrow(
      "Invalid name"
    );
  });


});
