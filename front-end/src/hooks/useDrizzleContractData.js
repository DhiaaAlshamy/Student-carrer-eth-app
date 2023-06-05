import { useContext, useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

const useDrizzleContractData = (contractName, method, ...args) => {
  const { drizzle } = useContext(DrizzleContext.Context);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (drizzle) {
        const contract = drizzle.contracts[contractName];
        const contractMethod = contract.methods[method];

        try {
          const result = await contractMethod(...args).call();
          setData(result);
        } catch (error) {
          console.error("fetching contract data:", error);
          setError("Failed to retrieve data  You don't have the permission to view This Information ");
        }
      }
    };

    fetchData();
  }, [contractName, method, drizzle, ...args]);

  return { data, error };
};

export default useDrizzleContractData;
