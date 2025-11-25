package com.aish.expensetracker.servlet;

import com.aish.expensetracker.dao.ExpenseDao;
import com.aish.expensetracker.model.Expense;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/expenses")
public class ListExpensesServlet extends HttpServlet {

    private final ExpenseDao expenseDao = new ExpenseDao();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        List<Expense> expenses = expenseDao.getAllExpenses();
        req.setAttribute("expenses", expenses);

        req.getRequestDispatcher("index.jsp").forward(req, resp);
    }
}