import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDrizzleContractData from "../../hooks/useDrizzleContractData";

function StudentsList() {
  const [studentsList, setStudentsList] = useState(null);
  const students = useDrizzleContractData("StudentsStore","getStudents").data


  useEffect(() => {
   if(students){
    setStudentsList(students)
   }
  }, [students]);

  

  const allStudents = studentsList;
  console.log(allStudents);

  if (!allStudents) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Students</h1>

       
      </div>
      <div className="my-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                universityID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Program
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Year
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allStudents.map((universityID, index) => (
              <tr key=  {allStudents[index].universityID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {allStudents[index].universityID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {allStudents[index].name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allStudents[index].program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allStudents[index].submissionYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link className="text-indigo-600 hover:text-indigo-900" to={`../showStudent/${allStudents[index].universityID}`}>Show Student Info</Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}

export default StudentsList;
