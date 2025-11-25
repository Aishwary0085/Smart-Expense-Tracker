// current expense list from backend
let expenses = window.initialExpenses || [];

// helper: nice date
function formatDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-IN");
}

// inject CSS from JS
(function injectStyles() {
    const css = `
    * {
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    body {
        margin: 0;
        background: #020617;
        color: #e5e7eb;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 28px;
        background: #0f172a;
        box-shadow: 0 2px 10px rgba(0,0,0,0.6);
        position: sticky;
        top: 0;
        z-index: 10;
    }
    .navbar-title {
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }
    .navbar-sub {
        font-size: 0.9rem;
        opacity: 0.8;
    }
    .page {
        max-width: 1000px;
        margin: 28px auto 40px;
        padding: 0 16px;
    }
    .summary-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 18px;
    }
    .pill {
        background: #0b1120;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid #1f2937;
        font-size: 0.9rem;
    }
    .pill strong {
        color: #4ade80;
    }
    .card {
        background: #020617;
        border-radius: 12px;
        padding: 18px 18px 10px 18px;
        box-shadow: 0 16px 35px rgba(0,0,0,0.65);
        border: 1px solid #111827;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    .card-header h2 {
        margin: 0;
        font-size: 1.1rem;
    }
    .btn-primary {
        border: none;
        outline: none;
        border-radius: 999px;
        padding: 8px 16px;
        background: #22c55e;
        color: #022c22;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
    }
    .btn-primary:hover {
        background: #4ade80;
    }
    .expense-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 4px;
    }
    .expense-table thead {
        background: #020617;
    }
    .expense-table th,
    .expense-table td {
        padding: 10px 8px;
        border-bottom: 1px solid #111827;
        font-size: 0.9rem;
    }
    .expense-table th {
        text-align: left;
        font-weight: 500;
        color: #9ca3af;
    }
    .expense-table tbody tr:hover {
        background: #02091e;
    }
    .chip {
        display: inline-flex;
        padding: 3px 9px;
        border-radius: 999px;
        background: #1d283a;
        font-size: 0.78rem;
        color: #e5e7eb;
    }
    .amount-positive {
        color: #4ade80;
        font-weight: 600;
    }
    .empty-state {
        text-align: center;
        padding: 20px 0 12px;
        color: #6b7280;
        font-size: 0.9rem;
    }
    .fab {
        position: fixed;
        right: 18px;
        bottom: 18px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: none;
        background: #22c55e;
        box-shadow: 0 12px 25px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        color: #022c22;
        cursor: pointer;
        z-index: 20;
    }
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15,23,42,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 30;
    }
    .modal {
        background: #020617;
        border-radius: 14px;
        padding: 18px 20px 16px;
        width: 100%;
        max-width: 420px;
        border: 1px solid #111827;
        box-shadow: 0 20px 45px rgba(0,0,0,0.8);
    }
    .modal h3 {
        margin: 0 0 10px;
        font-size: 1.05rem;
    }
    .modal form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal label {
        font-size: 0.85rem;
        color: #9ca3af;
    }
    .modal input {
        width: 100%;
        padding: 7px 9px;
        border-radius: 8px;
        border: 1px solid #1f2937;
        background: #020617;
        color: #e5e7eb;
        font-size: 0.9rem;
    }
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 8px;
    }
    .btn-ghost {
        border-radius: 999px;
        padding: 7px 14px;
        background: transparent;
        border: 1px solid #374151;
        color: #e5e7eb;
        cursor: pointer;
        font-size: 0.85rem;
    }
    .btn-ghost:hover {
        background: #02091a;
    }
    `;
    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);
})();

function renderApp() {
    const root = document.getElementById("app-root");
    root.innerHTML = "";

    const navbar = document.createElement("div");
    navbar.className = "navbar";
    navbar.innerHTML = `
        <div>
            <div class="navbar-title">Smart Expense Tracker</div>
            <div class="navbar-sub">Developed by Aishwarya Dixit</div>
        </div>
        <div class="pill">Total Entries: <strong>${expenses.length}</strong></div>
    `;

    const page = document.createElement("div");
    page.className = "page";

    const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

    const summaryRow = document.createElement("div");
    summaryRow.className = "summary-row";
    summaryRow.innerHTML = `
        <div class="pill">Total Spent: <strong>₹${totalAmount.toFixed(2)}</strong></div>
        <div class="pill">Categories: <strong>${
        new Set(expenses.map(e => e.category)).size
    }</strong></div>
    `;

    const card = document.createElement("div");
    card.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    cardHeader.innerHTML = `
        <h2>Your recent expenses</h2>
        <button class="btn-primary" id="add-expense-btn">
            <span>＋</span> <span>Add Expense</span>
        </button>
    `;

    const table = document.createElement("table");
    table.className = "expense-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Amount (₹)</th>
            <th>Category</th>
            <th>Date</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");
    if (!expenses.length) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4;
        td.className = "empty-state";
        td.textContent = "No expenses added yet. Click on “Add Expense” to get started.";
        tr.appendChild(td);
        tbody.appendChild(tr);
    } else {
        expenses.forEach(e => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${e.title}</td>
                <td class="amount-positive">₹${e.amount.toFixed(2)}</td>
                <td><span class="chip">${e.category}</span></td>
                <td>${formatDate(e.date)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    card.appendChild(cardHeader);
    card.appendChild(table);

    page.appendChild(summaryRow);
    page.appendChild(card);

    root.appendChild(navbar);
    root.appendChild(page);

    const fab = document.createElement("button");
    fab.className = "fab";
    fab.textContent = "+";
    document.body.appendChild(fab);

    const addBtn = document.getElementById("add-expense-btn");
    addBtn.addEventListener("click", openAddModal);
    fab.addEventListener("click", openAddModal);
}

function openAddModal() {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <h3>Add New Expense</h3>
        <form id="expense-form">
            <div>
                <label>Title</label>
                <input type="text" name="title" required placeholder="e.g. Lunch, Petrol, Recharge" />
            </div>
            <div>
                <label>Amount (₹)</label>
                <input type="number" name="amount" step="0.01" required />
            </div>
            <div>
                <label>Category</label>
                <input type="text" name="category" required placeholder="Food, Travel, Bills..." />
            </div>
            <div>
                <label>Date</label>
                <input type="date" name="date" required />
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-ghost" id="cancel-btn">Cancel</button>
                <button type="submit" class="btn-primary">Save</button>
            </div>
        </form>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    const form = modal.querySelector("#expense-form");
    const cancelBtn = modal.querySelector("#cancel-btn");

    cancelBtn.onclick = () => backdrop.remove();

    form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const title = formData.get("title");
        const amount = parseFloat(formData.get("amount"));
        const category = formData.get("category");
        const date = formData.get("date");

        const newExpense = {
            id: Date.now(),
            title,
            amount,
            category,
            date
        };
        expenses.unshift(newExpense);
        document.body.removeChild(backdrop);
        renderApp();

        try {
            await fetch("add-expense", {
                method: "POST",
                body: new URLSearchParams({
                    title,
                    amount: amount.toString(),
                    category,
                    date
                })
            });
        } catch (err) {
            console.error("Failed to sync with backend", err);
        }
    };
}

document.addEventListener("DOMContentLoaded", renderApp);