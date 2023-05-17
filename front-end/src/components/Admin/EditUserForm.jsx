import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@domain.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@domain.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@domain.com', role: 'User' },
    { id: 4, name: 'Sara Lee', email: 'sara.lee@domain.com', role: 'User' },
  ];
  const EditUserForm = ({ currentUser, updateUser, setIsEditing }) => {
      const {id} = useParams(); 
      const navigate = useNavigate();
    //   console.log(id);
    currentUser=users.find(u=>u.id==id)
    const [name, setName] = useState(currentUser.name);
    const [username, setUsername] = useState(currentUser.username);
    const [publicAddress, setPublicAddress] = useState(currentUser.publicAddress);
    const [role, setRole] = useState(currentUser.role);
    const [faculty, setFaculty] = useState(currentUser.faculty);
    const [level, setLevel] = useState(currentUser.level);
    // console.log(object);
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { id: currentUser.id, name, username, publicAddress, role, faculty, level };
        updateUser(currentUser.id, updatedUser);
        setIsEditing(false);
    };

    return (
        <div className="w-full max-w-lg m-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-lg font-medium mb-4">Edit User Account</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="publicAddress">
                        Public Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="publicAddress"
                        type="text"
                        placeholder="Public Address"
                        value={publicAddress}
                        onChange={(e) => setPublicAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="employer">Employer</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="fill-current h-4 w-4"

                            /></div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="faculty">
                        Faculty
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="faculty"
                        type="text"
                        placeholder="Faculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="level">
                        Level
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="level"
                        type="number"
                        placeholder="Level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {

                            // setIsEditing(false)
                            navigate(-1)


                        }
                        }
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;