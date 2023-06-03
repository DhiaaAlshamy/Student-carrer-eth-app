import { useContext, useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

const useDrizzleContractData = (contractName, method, ...args) => {
  const { drizzle } = useContext(DrizzleContext.Context);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (drizzle) {
        const contract = drizzle.contracts[contractName];
        const contractMethod = contract.methods[method];

        try {
          const result = await contractMethod(...args).call();
          setData(result);
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      }
    };

    fetchData();
  }, [contractName, method, drizzle, ...args]);

  return data;
};

export default useDrizzleContractData;
