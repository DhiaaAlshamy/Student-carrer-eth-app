import React, { useEffect, useState } from "react";
import useDrizzleContractData from "../../hooks/useDrizzleContractData";
import { useParams } from "react-router-dom";
import StudentProfile from '../StudentProfile';
import StudentSemester from "./StudentSemester";

function StudentInfo() {
  const { id } = useParams();
  const [studentInfo, setStudentInfo] = useState(null);
  const student = useDrizzleContractData("StudentsStore", "showStudentInfoByToken", id);

  useEffect(() => {
    try {
      if (student) {
        setStudentInfo(student.data);
      }
    } catch (error) {
      console.error("Error retrieving student info:", error);
    }
  }, [student]);

  if (!studentInfo) {
    if (student.error) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-200 text-red-700 p-4 max-w-sm rounded-lg shadow">
            <p>{student.error}</p>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <div>
     <StudentProfile studentData={studentInfo} />
     <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold text-center mb-4">Student Semesters </h1>
      {studentInfo.semesterIDs&&
      <>      
      {studentInfo.semesterIDs?.length === 0 ? (
        <p>No semesters found.</p>
      ) : (
        <ul className="space-y-4">
          {studentInfo.semesterIDs?.map((semesterID) => (
            <li key={semesterID} className="border rounded p-4">
              <h2 className="text-lg font-bold">Semester ID: {semesterID}</h2>
              {/* Fetch and display the courses for this semester */}
            <StudentSemester studentId={studentInfo.universityID} semesterId={semesterID}/>
            </li>
          ))}
        </ul>
      )}
      </>}
    </div>
    </div>
  );
}

export default StudentInfo;
