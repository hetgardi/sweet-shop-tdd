const sweetShop = (() => {
  let sweets = [];

  const addSweet = (sweet) => {
    const { id, name, category, price, quantity } = sweet;

    if (typeof id !== "number") throw new Error("ID must be a number");
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

    sweets.push({ ...sweet });
  };

  const getAllSweets = () => sweets;

  const reset = () => {
    sweets = [];
  };

  const updateSweet = (id, updates) => {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) throw new Error("Sweet not found");

    const newSweet = { ...sweet };

    if ("price" in updates) {
      if (typeof updates.price !== "number" || updates.price < 0)
        throw new Error("Invalid price");
      newSweet.price = updates.price;
    }
    if ("quantity" in updates) {
      if (typeof updates.quantity !== "number" || updates.quantity < 0)
        throw new Error("Invalid quantity");
      newSweet.quantity = updates.quantity;
    }
    if ("name" in updates) {
      if (typeof updates.name !== "string" || !updates.name.trim())
        throw new Error("Invalid name");
      newSweet.name = updates.name;
    }
    if ("category" in updates) {
      if (typeof updates.category !== "string" || !updates.category.trim())
        throw new Error("Invalid category");
      newSweet.category = updates.category;
    }

    const idx = sweets.findIndex((s) => s.id === id);
    sweets[idx] = newSweet;
  };

  const deleteSweet = (id) => {
    const idx = sweets.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error("Sweet not found");
    sweets.splice(idx, 1);
  };

  const searchSweets = (filters = {}) => {
    const { name, category, minPrice, maxPrice } = filters;
    return sweets.filter((sweet) => {
      const matchName = name
        ? sweet.name.toLowerCase().includes(name.toLowerCase())
        : true;

      const matchCategory = category
        ? sweet.category.toLowerCase().includes(category.toLowerCase())
        : true;

      const matchMinPrice =
        typeof minPrice === "number" ? sweet.price >= minPrice : true;

      const matchMaxPrice =
        typeof maxPrice === "number" ? sweet.price <= maxPrice : true;

      return matchName && matchCategory && matchMinPrice && matchMaxPrice;
    });
  };

  return {
    addSweet,
    getAllSweets,
    reset,
    updateSweet,
    deleteSweet,
    searchSweets,
  };
})();

module.exports = { sweetShop };
