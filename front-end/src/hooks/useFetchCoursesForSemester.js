import { useDrizzle, useDrizzleState } from "@drizzle/react-plugin";
import { useState, useEffect } from "react";

// Custom React Hook to fetch the courses for a given semester
const useFetchCoursesForSemester = (universityID, semesterID) => {
  // Use drizzle hooks to access drizzle instance and contract state
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  // Use useState hook to store courses data and loading state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useEffect hook to call smart contract method and update courses data and loading state
  useEffect(() => {
    // Define an async function to fetch courses data
    const fetchCourses = async () => {
      // Get the contract instance from drizzle
      const contract = drizzle.contracts.StudentsStore;

      // Get the contract method data key from drizzle
      const dataKey = contract.methods["getStudentCourses"].cacheCall(universityID, semesterID);

      // Get the contract method return value from drizzle state
      const coursesData = state.contracts.StudentsStore.getStudentCourses[dataKey];

      // Check if courses data is available
      if (coursesData && coursesData.value) {
        // Update courses state with courses data value
        setCourses(coursesData.value);
      }

      // Update loading state to false
      setLoading(false);
    };

    // Call the async function
    fetchCourses();
  }, [drizzle, state, universityID, semesterID]);

  // Return an array with courses data and loading state
  return [courses, loading];
};
export default  useFetchCoursesForSemester;