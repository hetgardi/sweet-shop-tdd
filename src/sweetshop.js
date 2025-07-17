const sweetShop = (() => {
  let sweets = [];

  const addSweet = (sweet) => {
    const { id, name, category, price, quantity } = sweet;

    if (typeof id !== "number") 
      throw new Error("ID must be a number");
    if (typeof name !== "string" || !name.trim())
      throw new Error("Name is required");
    if (typeof category !== "string" || !category.trim())
      throw new Error("Category is required");
    if (typeof price !== "number" || price < 0)
      throw new Error("Invalid price");
    if (typeof quantity !== "number" || quantity < 0)
      throw new Error("Invalid quantity");

    const isDuplicate = sweets.some((s) => s.id === id);
    if (isDuplicate) throw new Error("Sweet with this ID already exists");

    sweets.push(sweet);
  };

  const getAllSweets = () => sweets;

  const reset = () => {
    sweets = [];
  };

  return {
    addSweet,
    getAllSweets,
    reset,
  };
})();

module.exports = { sweetShop };
