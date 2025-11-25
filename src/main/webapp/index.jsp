<%@ page import="java.util.List" %>
<%@ page import="com.aish.expensetracker.model.Expense" %>
<%
    List<Expense> expenses = (List<Expense>) request.getAttribute("expenses");
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Smart Expense Tracker | Aish</title>
</head>
<body>
<div id="app-root"></div>

<script>
    window.initialExpenses = [
        <%
           if (expenses != null && !expenses.isEmpty()) {
               for (int i = 0; i < expenses.size(); i++) {
                   com.aish.expensetracker.model.Expense e = expenses.get(i);
        %>
        {
            id: <%= e.getId() %>,
            title: "<%= e.getTitle() %>",
            amount: <%= e.getAmount() %>,
            category: "<%= e.getCategory() %>",
            date: "<%= e.getDate() %>"
        }<%= (i < expenses.size() - 1) ? "," : "" %>
        <%
               }
           }
        %>
    ];
</script>

<script src="assets/js/app.js"></script>
</body>
</html>