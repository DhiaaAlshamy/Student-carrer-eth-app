import React, { useEffect, useState } from "react";
import useDrizzleContractFunction from "../../hooks/useDrizzleContractFunction";
import useDrizzleContractData from "../../hooks/useDrizzleContractData";
import { useOutletContext } from "react-router-dom";

function Employers() {
  const [student] = useOutletContext();
  const [usersList, setUsersList] = useState(null);
  const users = useDrizzleContractData("UsersStore", "getAllUsers").data;
  const giveAllowance = useDrizzleContractFunction("StudentsStore", "grantTokenAllowance", [
    // Pass the necessary arguments for the transfer function
  ]);

  const giveTokens = useDrizzleContractFunction("TokenStore", "transfer", [
    // Pass the necessary arguments for the transfer function
  ]); 

  useEffect(() => {
    if (users) {
      setUsersList(users);
    }
  }, [users]);

  const allUsers = usersList;

  // if the data hasn't loaded yet, display a loading indicator
  if (!allUsers) {
    return <p>Loading...</p>;
  }

  const handleGiveTokens = (employerPublicAddress) => {
    console.log(student.universityID);
    console.log(giveAllowance.send(student.universityID,employerPublicAddress))
    // // Implement the logic to transfer tokens from the student to the employer
    giveTokens.send(employerPublicAddress, 2); // Replace `amount` with the desired token amount to transfer
  };

  return (
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Employers</h1>
      </div>
      <div className="my-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
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
                Public Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allUsers
              .filter((user) => user.role === "Employer")
              .map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.publicAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button
                      onClick={() => handleGiveTokens(user.publicAddress)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Give Tokens
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employers;
