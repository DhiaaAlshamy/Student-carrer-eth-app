import { useState, useEffect, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

const useDrizzleContractFunction = (contractName, methodName) => {
  const { drizzle, drizzleState } = useContext(DrizzleContext.Context);
  const [status, setStatus] = useState(null);

  const send = async (...args) => {
    const contract = drizzle.contracts[contractName];
    const method = contract.methods[methodName];
    const stackId = method.cacheSend(...args);

    setStatus({ status: "pending", stackId });
  };

  useEffect(() => {
    if (!drizzleState) return;

    const { transactions, transactionStack } = drizzleState;

    // Check if the transaction status has changed
    if (status && status.status === "pending" && status.stackId in transactions) {
      const tx = transactions[status.stackId];

      if (tx && tx.status) {
        setStatus({ status: tx.status, stackId: status.stackId });
      }
    }
  }, [drizzleState, status]);

  return { send, status };
};

export default useDrizzleContractFunction;
