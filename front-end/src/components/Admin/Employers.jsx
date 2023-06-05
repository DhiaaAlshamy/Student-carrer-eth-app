import React, { useEffect, useState } from "react";
import useDrizzleContractData from "../../hooks/useDrizzleContractData";

function Employers() {
    const [usersList, setUsersList] = useState(null);
    const users = useDrizzleContractData("UsersStore", "getAllUsers").data;

    useEffect(() => {
        if(users){
            setUsersList(users)
        }
    }, [users]);


    const allUsers = usersList

    // if the data hasn't loaded yet, display a loading indicator
    if (!allUsers) {
        return <p>Loading...</p>;
    }

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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allUsers
                            .filter(user => user.role === "Employer")
                            .map(user => (
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
                                 
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Employers;
