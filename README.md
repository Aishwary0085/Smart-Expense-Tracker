Smart Expense Tracker

Smart Expense Tracker is a full-stack Java web application that helps users record, manage, and analyze their daily expenses in a simple and visually clean interface.  
It uses a **Java + JSP + Servlet + JDBC + MySQL** backend and a **JavaScript-powered UI** for a smooth, interactive experience.

🚀 Features

- Add new expenses with:
  - Title  
  - Amount (₹)  
  - Category  
  - Date  
- View all expenses in a clean, tabular view
- Total expenses and unique category count summary
- Modern, dark-themed UI built using JavaScript (dynamic rendering)
- Data stored persistently in **MySQL** database
- Deployed on **Apache Tomcat**

 🛠 Tech Stack

**Backend:**
- Java
- JSP
- Servlets (`AddExpenseServlet`, `ListExpensesServlet`)
- JDBC
- Apache Tomcat

**Database:**
- MySQL  
- Table: `expenses`

**Frontend:**
- JSP
- Vanilla JavaScript (`app.js`)
- Dynamic DOM rendering
- Custom CSS injected via JS

**Build & Tools:**
- IntelliJ IDEA
- Git & GitHub

 📁 Project Structure
Smart-Expense-Tracker/
├─ src/
│  └─ main/
│     ├─ java/
│     │  └─ com/aish/expensetracker/
│     │     ├─ model/
│     │     │  └─ Expense.java
│     │     ├─ dao/
│     │     │  └─ ExpenseDao.java
│     │     └─ servlet/
│     │        ├─ AddExpenseServlet.java
│     │        └─ ListExpensesServlet.java
│     └─ webapp/
│        ├─ index.jsp
│        └─ assets/
│           └─ js/
│              └─ app.js
├─ db.sql
└─ README.md
