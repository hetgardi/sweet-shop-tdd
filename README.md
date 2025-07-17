# 🍬 Sweet Shop Management System

A modern, test-driven inventory management app for sweet shops. Built with JavaScript, HTML, and CSS—featuring a sleek, dark UI and robust business logic.

---

##  Overview

Sweet Shop Management System streamlines sweet inventory, sales, and restocking. Designed for reliability and maintainability, every feature is backed by automated tests.

---

##  Objective

* Deliver a full-featured sweet shop inventory and sales solution.
* Ensure code correctness and reliability using **Test-Driven Development (TDD)**.
* Provide a delightful, intuitive user experience.

---

## 🧠 Brainstorming & Failure Analysis

Before coding, we identified possible failure points:

* Invalid sweet data (empty name, negative price/quantity)
* Duplicate sweet IDs
* Over-purchasing (more than available stock)
* Restocking with invalid amounts
* Searching/sorting edge cases
* Data loss on refresh

Each scenario was translated into a test case before implementation.

---

## 🧪 Test-Driven Development Journey

###  Write Failing Tests

* Unit tests for add, update, delete, search, sort, purchase, restock
* Edge cases for invalid input, error handling, and boundary conditions

###  Implement Functionality

* Develop features to pass all tests
* Refactor for clarity and maintainability

###  Run & Pass Tests

* All tests must pass before moving forward
* Continuous testing with Jest

###  Version Control & Git

* Commit after each green test run
* Use branches for features and fixes
* Push regularly to GitHub to document progress

---

## 🚀 Features

* **Sweet Management**: Add, edit, delete sweets
* **Inventory Tracking**: Real-time stock, low-stock alerts
* **Search & Filter**: By name, category, price range
* **Sorting**: By price and quantity, ascending/descending
* **Purchase & Restock**: Update stock with validation
* **Category Management**: Create custom categories
* **Responsive UI**: Works on desktop and mobile
* **Data Persistence**: (Optional) Local storage support
* **Error Handling**: Friendly user feedback and validation

---

## 🛠️ Tech Stack

| Area         | Technology                |
| ------------ | ------------------------- |
| Frontend     | HTML5, CSS3, TailwindCSS  |
| Logic        | JavaScript (ES6+)         |
| Testing      | Jest                      |
| Dev Tools    | Node.js, npm, Live Server |
| Code Quality | ESLint, Prettier          |
| Version Ctrl | Git & GitHub              |

---

## 📁 Folder Structure

```
sweet-shop-tdd/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets/
│       ├── main.png
│       ├── delete.png
│       ├── edit.png
│       ├── Price_Range.png
│       ├── Purchase.png
│       ├── Restock.png
│       ├── sort by.png
│       └── test-report.png
├── src/
│   └── sweetShop.js
├── test/
│   ├── add.test.js
│   ├── delete.test.js
│   ├── purchase.test.js
│   ├── restock.test.js
│   ├── search.test.js
│   ├── sort.test.js
│   ├── update.test.js
│   └── view.test.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/hetgardi/sweet-shop-tdd.git
cd sweet-shop-tdd
npm install
```

### 🖥️ Run Frontend (Live Server)

```bash
npm run dev
```

###  Run Tests

```bash
npm test
```

---

## 📊 Test Report Summary

> **All 49 unit tests passed ✅**

```bash
PASS  test/purchase.test.js
PASS  test/add.test.js
PASS  test/update.test.js
PASS  test/restock.test.js
PASS  test/search.test.js
PASS  test/delete.test.js
PASS  test/sort.test.js
PASS  test/view.test.js

Test Suites: 8 passed, 8 total
Tests:       49 passed, 49 total
Snapshots:   0 total
Time:        0.975 s
```

📸 See full result screenshot: `frontend/assets/test-report.png`

---

## 🎨 UI/UX Highlights

* Elegant dark theme styling
* Responsive layouts
* Clean modal dialogs for edit/purchase/restock
* Search, sort, and filter functionalities
* Visual feedback with toast and icons


## 📄 License

MIT License — Free to use with attribution.

---

## 👤 Author

**Het Gardi**
GitHub: [@hetgardi](https://github.com/hetgardi)

---

## 🙏 Acknowledgments

* Built from scratch with TDD-first principles
* Inspired by real-world business inventory needs
* Thanks to everyone who reviewed or tested the app!

---

Enjoy managing your sweet shop with confidence and style! 🍫🍭
