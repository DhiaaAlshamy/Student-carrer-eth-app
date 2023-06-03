import { useContext, useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";

const useDrizzle = () => {
  // Get the drizzle context from React
  const drizzleContext = useContext(DrizzleContext.Context);

  // Destructure the drizzle instance and the initialized flag
  const { drizzle, initialized } = drizzleContext;

  // Declare a state variable to store the drizzle state
  const [drizzleState, setDrizzleState] = useState(null);

  // Use useEffect hook to update the drizzle state when initialized or changed
  useEffect(() => {
    // Check if drizzle is initialized
    if (initialized) {
      // Subscribe to drizzle store changes and set the state
      const unsubscribe = drizzle.store.subscribe(() => {
        setDrizzleState(drizzle.store.getState());
      });

      // Return a cleanup function to unsubscribe from the store
      return () => {
        unsubscribe();
      };
    }
  }, [initialized, drizzle]);

  // Return the drizzle instance and the drizzle state
  return { drizzle, drizzleState };
};

export default useDrizzle;
