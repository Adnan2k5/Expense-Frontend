import React from "react";
import { Card, Progress } from "antd";

export const Analytics = ({ allTransaction }) => {
  const totalTransaction = allTransaction.length;

  // Filter income and expense transactions
  const incomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "Income"
  );
  const expenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "Expense"
  );

  // Calculate total income and expense amounts
  const totalIncome = incomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpense = expenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalIncomeTransactions = incomeTransactions.length;
  const totalExpenseTransactions = expenseTransactions.length;

  const incomeSources = [
    ...new Set(incomeTransactions.map((transaction) => transaction.category)),
  ];
  const expenseSources = [
    ...new Set(expenseTransactions.map((transaction) => transaction.category)),
  ];

  const turnover = totalIncome - totalExpense;

  // Calculate income and expense percentages
  const incomePercentage = (totalIncome / (totalIncome + totalExpense)) * 100;
  const expensePercentage = (totalExpense / (totalIncome + totalExpense)) * 100;
  return (
    <>
      <div className="w-full flex gap-4">
        <Card
          className="w-[33%] text-lg"
          title={`Total Transaction: ${totalTransaction}`}
        >
          <p>{`Total Income Transaction: ${totalIncomeTransactions}`}</p>
          <p>{`Total Expense Transaction: ${totalExpenseTransactions}`}</p>
        </Card>
        <Card className="w-[33%]" title="Income vs Expense">
          <div className="flex justify-around">
            <div className="income-progress">
              <Progress
                type="circle"
                percent={incomePercentage.toFixed(2)}
                format={() => (
                  <span className="text-xs">{`Income ${incomePercentage.toFixed(
                    2
                  )}%`}</span>
                )}
              />
            </div>
            <div className="expense-progress">
              <Progress
                type="circle"
                percent={expensePercentage.toFixed(2)}
                format={() => (
                  <span className="text-xs">{`Expense ${expensePercentage.toFixed(
                    2
                  )}%`}</span>
                )}
                style={{ marginLeft: "20px" }}
              />
            </div>
          </div>
        </Card>
        <Card
          className="w-[33%]"
          title={`Balance: ${turnover}`}
          bordered={false}
        >
          <p className="text-green-400">Total Income: {totalIncome}</p>
          <p className="text-red-500">Total Expense: {totalExpense}</p>
        </Card>
      </div>
      <div className=" flex mt-4 gap-4 w-full">
        <Card className="w-[50%]" title="Income Sources" bordered={false}>
          <ul>
            {incomeSources.map((source) => (
              <li key={source} className="text-gray-600">
                {source}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="w-[50%]" title="Expenses" bordered={false}>
          <ul>
            {expenseSources.map((source) => (
              <li key={source} className="text-gray-600">
                {source}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
};
