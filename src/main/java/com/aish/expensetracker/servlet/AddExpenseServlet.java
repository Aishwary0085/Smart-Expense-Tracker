package com.aish.expensetracker.servlet;

import com.aish.expensetracker.dao.ExpenseDao;
import com.aish.expensetracker.model.Expense;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/add-expense")
public class AddExpenseServlet extends HttpServlet {

    private final ExpenseDao expenseDao = new ExpenseDao();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        req.setCharacterEncoding("UTF-8");

        String title = req.getParameter("title");
        String amountStr = req.getParameter("amount");
        String category = req.getParameter("category");
        String date = req.getParameter("date");

        double amount = 0.0;
        try {
            amount = Double.parseDouble(amountStr);
        } catch (NumberFormatException e) {
            amount = 0.0;
        }

        Expense expense = new Expense(title, amount, category, date);
        expenseDao.saveExpense(expense);

        // Redirect back to list page
        resp.sendRedirect("expenses");
    }
}