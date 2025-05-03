document.addEventListener("DOMContentLoaded", function () {
    const totalIncome = Number(localStorage.getItem("totalIncome") || 0);
    const totalFixedExpenses = Number(localStorage.getItem("totalFixedExpenses") || 0);
    const totalVariableExpenses = Number(localStorage.getItem("totalVariableExpenses") || 0);
    const totalDebtRepayment = Number(localStorage.getItem("totalDebtRepayment") || 0);
    const totalUpcomingExpenses = Number(localStorage.getItem("totalUpcomingExpenses") || 0);
    const totalExpenses = Number(localStorage.getItem("totalExpenses") || 0);
    const totalSavings = Number(localStorage.getItem("totalSavings") || 0);
    const savingsGoal = Number(localStorage.getItem("savingsGoal") || 0);
    const investmentGoal = Number(localStorage.getItem("investmentGoal") || 0);

    // Update UI with stored values
    document.getElementById("totalIncome").textContent = ` ₹${totalIncome}`;
    document.getElementById("totalFixedExpenses").textContent = ` ₹${totalFixedExpenses}`;
    document.getElementById("totalVariableExpenses").textContent = ` ₹${totalVariableExpenses}`;
    document.getElementById("totalDebtRepayment").textContent = ` ₹${totalDebtRepayment}`;
    document.getElementById("totalUpcomingExpenses").textContent = ` ₹${totalUpcomingExpenses}`;
    document.getElementById("totalExpenses").textContent = ` ₹${totalExpenses}`;
    document.getElementById("totalSavings").textContent = ` ₹${totalSavings}`;
    document.getElementById("savingsGoal").textContent = `🎯 ₹${savingsGoal}`;
    document.getElementById("investmentGoal").textContent = `📈 ₹${investmentGoal}`;

    // 🎯 Highlighted Savings Status Message (Bold + Styled)
    const savingsStatus = document.getElementById("savingsStatus");

    savingsStatus.innerHTML = totalSavings >= savingsGoal
        ? `<strong style="color: green; font-size: 1.3em; background-color: #e6ffe6; padding: 10px; display: block; text-align: center;">🎉 You have met your savings goal! 🎯</strong>`
        : `<strong style="color: red; font-size: 1.3em; background-color: #ffe6e6; padding: 10px; display: block; text-align: center;">⚠️ You need to save ₹${savingsGoal - totalSavings} more to meet your goal. 📝</strong>`;
});

function calculateExpenses(event) {
    event.preventDefault();

    const form = document.getElementById("expenseForm");
    const formData = new FormData(form);

    let totalIncome = 0;
    let totalExpenses = 0;

    // Income Calculation
    totalIncome += Number(formData.get("incomeFromSalary") || 0);
    totalIncome += Number(formData.get("incomeFromSideJobs") || 0);
    totalIncome += Number(formData.get("rentalIncome") || 0);
    totalIncome += Number(formData.get("investmentIncome") || 0);
    totalIncome += Number(formData.get("others") || 0);

    // Fixed Expenses Calculation
    let totalFixedExpenses = 0;
    totalFixedExpenses += Number(formData.get("rent") || 0);
    totalFixedExpenses += Number(formData.get("insurance") || 0);
    totalFixedExpenses += Number(formData.get("subscriptions") || 0);
    totalFixedExpenses += Number(formData.get("utilities") || 0);
    totalFixedExpenses += Number(formData.get("childcare") || 0);
    totalFixedExpenses += Number(formData.get("otherFixed") || 0);

    // Variable Expenses Calculation
    let totalVariableExpenses = 0;
    totalVariableExpenses += Number(formData.get("groceries") || 0);
    totalVariableExpenses += Number(formData.get("transportation") || 0);
    totalVariableExpenses += Number(formData.get("entertainment") || 0);
    totalVariableExpenses += Number(formData.get("health") || 0);
    totalVariableExpenses += Number(formData.get("shopping") || 0);
    totalVariableExpenses += Number(formData.get("otherVariable") || 0);

    // Debt Repayment Calculation
    let totalDebtRepayment = 0;
    totalDebtRepayment += Number(formData.get("creditCard") || 0);
    totalDebtRepayment += Number(formData.get("loanRepayment") || 0);
    totalDebtRepayment += Number(formData.get("emi") || 0);
    totalDebtRepayment += Number(formData.get("otherRepayments") || 0);

    // Upcoming Expenses Calculation
    let totalUpcomingExpenses = 0;
    totalUpcomingExpenses += Number(formData.get("vacationExpenses") || 0);
    totalUpcomingExpenses += Number(formData.get("homeRepairs") || 0);
    totalUpcomingExpenses += Number(formData.get("giftsEvents") || 0);
    totalUpcomingExpenses += Number(formData.get("otherUpcoming") || 0);

    // Total Expenses Calculation
    totalExpenses = totalFixedExpenses + totalVariableExpenses + totalDebtRepayment + totalUpcomingExpenses;

    // Savings Calculation
    const totalSavings = totalIncome - totalExpenses;
    const savingsGoal = Number(formData.get("savingsGoal") || 0);
    const investmentGoal = Number(formData.get("investmentGoal") || 0);

    // Store data in localStorage
    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("totalFixedExpenses", totalFixedExpenses);
    localStorage.setItem("totalVariableExpenses", totalVariableExpenses);
    localStorage.setItem("totalDebtRepayment", totalDebtRepayment);
    localStorage.setItem("totalUpcomingExpenses", totalUpcomingExpenses);
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("totalSavings", totalSavings);
    localStorage.setItem("savingsGoal", savingsGoal);
    localStorage.setItem("investmentGoal", investmentGoal);

    window.location.href = "expense-summary.html";
}

// Auto-fill Form with Stored Data
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expenseForm");

    function loadStoredValues() {
        document.querySelectorAll("input, select").forEach(field => {
            const savedValue = localStorage.getItem(field.id);
            if (savedValue !== null) {
                field.value = savedValue;
            }
        });
    }

    // Load stored values when the page loads
    loadStoredValues();

    // Save input values in localStorage on change
    function saveToLocalStorage(event) {
        localStorage.setItem(event.target.id, event.target.value);
    }

    document.querySelectorAll("input, select").forEach(field => {
        field.addEventListener("input", saveToLocalStorage);
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload
        window.location.href = "expense-summary.html"; // Redirect to summary page
    });

    // Handle Reset Button - Clears form & storage
    document.getElementById("resetForm").addEventListener("click", function () {
        if (confirm("Are you sure you want to reset all form fields? This action cannot be undone.")) {
            form.reset();
            localStorage.clear(); // Clears stored data
            loadStoredValues(); // Reload to reflect cleared data
        }
    });
});
