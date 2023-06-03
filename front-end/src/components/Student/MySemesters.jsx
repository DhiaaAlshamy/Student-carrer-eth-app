import React, { useEffect, useState } from "react";
import useDrizzleContractData from "../../hooks/useDrizzleContractData";
import { useOutletContext } from "react-router-dom";
import StudentSemester from "./StudentSemester";

const MySemesters = () => {
  const [student] = useOutletContext();
  const [studentInfo,setStudentInfo]=useState({universityID:[]});
  const std = useDrizzleContractData("StudentsStore", "getStudentInfo",student.universityID);
  // const studentInfo = useDrizzleContractData("StudentsStore", "getStudentInfo",student.universityID);

  useEffect(() => {
    if(std)
    setStudentInfo(std)
    console.log(std);
  }, [std ]);

  if (!student) {
    return <p>Loading...</p>;
  }


  const { semesterIDs } = studentInfo;

  return (
    <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold text-center mb-4">My Semesters</h1>
      {semesterIDs&&
      <>      
      {semesterIDs?.length === 0 ? (
        <p>No semesters found.</p>
      ) : (
        <ul className="space-y-4">
          {semesterIDs?.map((semesterID) => (
            <li key={semesterID} className="border rounded p-4">
              <h2 className="text-lg font-bold">Semester ID: {semesterID}</h2>
              {/* Fetch and display the courses for this semester */}
            <StudentSemester semesterId={semesterID}/>
            </li>
          ))}
        </ul>
      )}
      </>}
    </div>
  );
};

// Function to fetch the courses for a given semester using the smart contract method
const fetchCoursesForSemester = (universityID, semesterID) => {
  // Implement the logic to fetch the courses from the smart contract
  // You can use the provided `getStudentCourses` method in the smart contract
  // Pass the universityID and semesterID to the method and return the result

  // Example code:
  // const courses = await contract.getStudentCourses(universityID, semesterID);
  // return courses;

  // Placeholder data for testing
  return [
    {
      courseCode: "CSE101",
      courseName: "Introduction to Computer Science",
      maxGrade: 100,
      studentGrade: 85,
    },
    {
      courseCode: "MAT201",
      courseName: "Linear Algebra",
      maxGrade: 100,
      studentGrade: 90,
    },
  ];
};

export default MySemesters;
