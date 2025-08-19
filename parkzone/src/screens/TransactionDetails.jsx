import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionById } from "../services/transaction";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const response = await getTransactionById(id);
        setTransaction(response.data);
      } catch (error) {
        console.error("Failed to fetch transaction details", error);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  if (!transaction)
    return <h3 className="text-center">Loading transaction details...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Transaction Details</h2>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Transaction ID</th>
            <td>{transaction.transactionId}</td>
          </tr>
          <tr>
            <th>Amount</th>
            <td>{transaction.amount ? `₹${transaction.amount}` : "N/A"}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{transaction.status}</td>
          </tr>
          <tr>
            <th>Payment Method</th>
            <td>{transaction.paymentMethod || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
