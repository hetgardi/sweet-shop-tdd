document.addEventListener("DOMContentLoaded", function () {
  const sweetsGrid = document.getElementById("sweetsGrid");
  const addForm = document.getElementById("addSweetForm");
  const searchName = document.getElementById("searchName");
  const searchCategory = document.getElementById("searchCategory");
  const searchMinPrice = document.getElementById("searchMinPrice");
  const searchMaxPrice = document.getElementById("searchMaxPrice");
  const sortSelect = document.getElementById("sortSelect");
  const categorySelect = document.getElementById("categorySelect");
  const newCategoryInput = document.getElementById("newCategoryInput");
  const modal = document.getElementById("modal");
  const toast = document.getElementById("toast");

  // Make important functions accessible globally
  window.hideModal = function () {
    modal.classList.add("hidden");
  };

  let categories = ["Milk-Based", "Nut-Based", "Gram-Based", "Flaky"];
  let sweets = JSON.parse(localStorage.getItem("sweets")) || [
    {
      id: 1,
      name: "Gulab Jamun",
      category: "Milk-Based",
      price: 25,
      quantity: 10,
    },
    { id: 2, name: "Rasgulla", category: "Milk-Based", price: 25, quantity: 8 },
    {
      id: 3,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 5,
    },
    { id: 4, name: "Barfi", category: "Milk-Based", price: 20, quantity: 20 },
  ];
  let searchFilters = { name: "", category: "", minPrice: "", maxPrice: "" };
  let sortCondition = "";

  function saveData() {
    localStorage.setItem("sweets", JSON.stringify(sweets));
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  function showToast(message, error = false) {
    toast.textContent = message;
    toast.className = "toast" + (error ? " error" : "");
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }

  function showModal(content) {
    modal.innerHTML = `<div class="modal-content">${content}<button class="modal-close" onclick="hideModal()">&times;</button></div>`;
    modal.classList.remove("hidden");
  }

  function renderCategoryOptions() {
    categorySelect.innerHTML = categories
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join("");
  }

  function renderSweets() {
    let filtered = sweets.filter((s) => {
      const matchName = searchFilters.name
        ? s.name.toLowerCase().includes(searchFilters.name.toLowerCase())
        : true;
      const matchCategory = searchFilters.category
        ? s.category
            .toLowerCase()
            .includes(searchFilters.category.toLowerCase())
        : true;
      const matchMinPrice = searchFilters.minPrice
        ? s.price >= Number(searchFilters.minPrice)
        : true;
      const matchMaxPrice = searchFilters.maxPrice
        ? s.price <= Number(searchFilters.maxPrice)
        : true;
      return matchName && matchCategory && matchMinPrice && matchMaxPrice;
    });

    if (sortCondition === "PRICE_LOW_TO_HIGH") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortCondition === "PRICE_HIGH_TO_LOW") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortCondition === "QUANTITY_LOW_TO_HIGH") {
      filtered.sort((a, b) => a.quantity - b.quantity);
    } else if (sortCondition === "QUANTITY_HIGH_TO_LOW") {
      filtered.sort((a, b) => b.quantity - a.quantity);
    }

    sweetsGrid.innerHTML = filtered.length
      ? filtered
          .map(
            (sweet) => `
        <div class="sweet-card" data-id="${sweet.id}">
          <div class="actions">
            <button class="icon-btn edit" title="Edit"><i class="fas fa-pencil-alt"></i></button>
            <button class="icon-btn delete" title="Delete"><i class="fas fa-trash"></i></button>
            <button class="icon-btn restock" title="Restock"><i class="fas fa-plus"></i></button>
            <button class="icon-btn purchase" title="Purchase"><i class="fas fa-shopping-cart"></i></button>
          </div>
          <h3>${sweet.name}</h3>
          <div class="category">Category: ${sweet.category}</div>
          <div class="price">Price: ₹${sweet.price}</div>
          <div class="quantity">Quantity: ${sweet.quantity}</div>
        </div>
      `
          )
          .join("")
      : `<div style="grid-column: span 2; text-align:center; color:#f59e42; padding:32px 0;">No sweets found</div>`;

    document.querySelectorAll(".sweet-card").forEach((card) => {
      const id = Number(card.getAttribute("data-id"));
      card.querySelector(".edit").onclick = () => editSweet(id);
      card.querySelector(".delete").onclick = () => deleteSweet(id);
      card.querySelector(".restock").onclick = () => restockSweet(id);
      card.querySelector(".purchase").onclick = () => purchaseSweet(id);
    });
  }

  addForm.onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(addForm);
    let category = formData.get("category");
    const newCat = newCategoryInput.value.trim();
    if (newCat && !categories.includes(newCat)) {
      categories.push(newCat);
      renderCategoryOptions();
      category = newCat;
      showToast(`Category "${newCat}" added`);
    }
    const sweet = {
      id: Date.now(),
      name: formData.get("name").trim(),
      category,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
    };
    sweets.push(sweet);
    saveData();
    addForm.reset();
    renderSweets();
    showToast(`${sweet.name} added successfully`);
  };

  searchName.oninput = (e) => {
    searchFilters.name = e.target.value;
    renderSweets();
  };
  searchCategory.oninput = (e) => {
    searchFilters.category = e.target.value;
    renderSweets();
  };
  searchMinPrice.oninput = (e) => {
    searchFilters.minPrice = e.target.value;
    renderSweets();
  };
  searchMaxPrice.oninput = (e) => {
    searchFilters.maxPrice = e.target.value;
    renderSweets();
  };
  sortSelect.onchange = (e) => {
    sortCondition = e.target.value;
    renderSweets();
  };

  function editSweet(id) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) return;
    showModal(`
      <h2 style="margin-bottom:18px;">Edit Sweet</h2>
      <form id="editForm" style="display:grid;gap:18px;">
        <div style="display:flex;flex-direction:column;">
          <label for="editName" style="margin-bottom:6px;font-weight:500;">Name</label>
          <input type="text" id="editName" name="name" value="${sweet.name}" required style="padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        </div>
        <div style="display:flex;flex-direction:column;">
          <label for="editCategory" style="margin-bottom:6px;font-weight:500;">Category</label>
          <input type="text" id="editCategory" name="category" value="${sweet.category}" required style="padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        </div>
        <div style="display:flex;flex-direction:column;">
          <label for="editPrice" style="margin-bottom:6px;font-weight:500;">Price</label>
          <input type="number" id="editPrice" name="price" value="${sweet.price}" required min="0" style="padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        </div>
        <div style="display:flex;flex-direction:column;">
          <label for="editQuantity" style="margin-bottom:6px;font-weight:500;">Quantity</label>
          <input type="number" id="editQuantity" name="quantity" value="${sweet.quantity}" required min="0" style="padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        </div>
        <button type="submit" class="add-btn" style="margin-top:8px;">Update</button>
      </form>
    `);
    document.getElementById("editForm").onsubmit = function (ev) {
      ev.preventDefault();
      const fd = new FormData(ev.target);
      sweet.name = fd.get("name");
      sweet.category = fd.get("category");
      sweet.price = Number(fd.get("price"));
      sweet.quantity = Number(fd.get("quantity"));
      saveData();
      hideModal();
      renderSweets();
      showToast("Sweet updated");
    };
  }

  function deleteSweet(id) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) return;
    showModal(`
      <h2>Delete Sweet</h2>
      <p>Are you sure you want to delete <b>${sweet.name}</b>?</p>
      <div style="margin-top:24px; display:flex; gap:12px;">
        <button id="confirmDeleteBtn" class="add-btn">Yes, Delete</button>
        <button id="cancelDeleteBtn" class="add-btn" style="background:#444;">Cancel</button>
      </div>
    `);
    document.getElementById("confirmDeleteBtn").onclick = function () {
      sweets = sweets.filter((s) => s.id !== id);
      saveData();
      hideModal();
      renderSweets();
      showToast("Sweet deleted");
    };
    document.getElementById("cancelDeleteBtn").onclick = hideModal;
  }

  function restockSweet(id) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) return;
    showModal(`
      <h2>Restock Sweet</h2>
      <p>Current quantity: ${sweet.quantity}</p>
      <form id="restockForm" style="margin-top:18px;">
        <input type="number" name="amount" min="1" placeholder="Amount to add" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        <button type="submit" class="add-btn" style="margin-top:14px;">Restock</button>
      </form>
    `);
    document.getElementById("restockForm").onsubmit = function (ev) {
      ev.preventDefault();
      const amount = Number(new FormData(ev.target).get("amount"));
      if (amount > 0) {
        sweet.quantity += amount;
        saveData();
        hideModal();
        renderSweets();
        showToast("Sweet restocked");
      } else {
        showToast("Invalid amount", true);
      }
    };
  }

  function purchaseSweet(id) {
    const sweet = sweets.find((s) => s.id === id);
    if (!sweet) return;
    showModal(`
      <h2>Purchase Sweet</h2>
      <p>Available quantity: ${sweet.quantity}</p>
      <form id="purchaseForm" style="margin-top:18px;">
        <input type="number" name="amount" min="1" max="${sweet.quantity}" placeholder="Amount to purchase" required style="width:100%;padding:10px;border-radius:8px;border:1px solid #444;background:#181818;color:#fff;">
        <button type="submit" class="add-btn" style="margin-top:14px;">Purchase</button>
      </form>
    `);
    document.getElementById("purchaseForm").onsubmit = function (ev) {
      ev.preventDefault();
      const amount = Number(new FormData(ev.target).get("amount"));
      if (amount > 0 && amount <= sweet.quantity) {
        sweet.quantity -= amount;
        saveData();
        hideModal();
        renderSweets();
        showToast("Sweet purchased");
      } else {
        showToast("Invalid amount", true);
      }
    };
  }

  modal.onclick = function (e) {
    if (e.target === modal) hideModal();
  };

  // Initialize
  renderCategoryOptions();
  renderSweets();
});
