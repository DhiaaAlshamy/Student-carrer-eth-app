import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditStudent from "./EditStudentForm";

function Students({ drizzle, drizzleState }) {
  const [dataKey, setDataKey] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const contract = drizzle.contracts.StudentsStore;

    const dataKey = contract.methods["getStudents"].cacheCall();
    setDataKey(dataKey);
  }, [drizzle]);

  const handleEditStudent = (index) => {
    setSelectedStudent(index);
  };

  const handleCloseEdit = () => {
    setSelectedStudent(null);
  };

  const { StudentsStore } = drizzleState.contracts;

  const allStudents = StudentsStore.getStudents[dataKey];
  console.log(allStudents);

  if (!allStudents || !allStudents.value) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Students</h1>

        <Link  to="../addStudent" >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Student
          </button>
        </Link>
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
            {allStudents.value.map((universityID, index) => (
              <tr key=  {allStudents.value[index].universityID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {allStudents.value[index].universityID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {allStudents.value[index].name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allStudents.value[index].program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {allStudents.value[index].submissionYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link className="text-indigo-600 hover:text-indigo-900" to={`../editStudent/${allStudents.value[index].universityID}`}>Edit</Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}

export default Students;
