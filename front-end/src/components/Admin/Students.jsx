import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Students({ drizzle, drizzleState }) {
const [dataKey, setDataKey] = useState(null);

useEffect(() => {
const contract = drizzle.contracts.StudentsStore;
// console.log(contract);
// let drizzle know we want to watch the getAllStudents method
const dataKey = contract.methods["getAllStudents"].cacheCall();

// save the `dataKey` to local component state for later reference
setDataKey(dataKey);

}, [drizzle]);
// useEffect(() => {
//   const checkAccount = async () => {
//     const accounts = await drizzle.web3.eth.getAccounts();
//     accounts.map((account, index) => {
//       console.log('account',index,account);
//     })
     
//   };
//   checkAccount();
// }, []);
// get the contract state from drizzleState
// console.log(drizzle.eth.);
const { StudentsStore } = drizzleState.contracts;

// using the saved dataKey, get the variables we're interested in
const allStudents = StudentsStore.getAllStudents[dataKey];

// if the data hasn't loaded yet, display a loading indicator
if (!allStudents || !allStudents.value) {
return <p>Loading...</p>;
}



  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Students</h1>
        
        <Link to='/addStudent'>
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
          {allStudents.value[0].map((universityID, index) => (
              <tr key= {universityID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {universityID}
                                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {allStudents.value[1][index]}
                </td>
             
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {allStudents.value[2][index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {allStudents.value[3][index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
