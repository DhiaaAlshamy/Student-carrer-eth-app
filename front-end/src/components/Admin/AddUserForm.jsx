import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

const AddUserForm = ({ drizzle,drizzleState }) => {
  const [name, setName] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();

  const handleAddUser = async () => {
    try {
      const contract = drizzle.contracts.UsersStore;
      const registerUserTx = contract.methods.addUser(
        publicAddress,
        name,
        email,
        role
      );
      const gasLimit = await registerUserTx.estimateGas();
      await registerUserTx.send({
        from: drizzleState.accounts[0],
        gas: gasLimit,
      });
      alert("User added successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Error adding user. Please try again.");
    }
  };

  const handleCreateAccount = async () => {
    try {
      const web3 = new Web3(drizzle.web3.currentProvider);
      const password = 'password'; // TODO: Use a secure password generation method
      const account = web3.eth.accounts.create(password);
      console.log(`Created account ${account.address} with private key ${account.privateKey} for user ${publicAddress}`);
    } catch (error) {
      console.error(error);
      alert("Error creating account. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleAddUser();
    await handleCreateAccount();
  };

  return (
    <div className="w-full max-w-lg m-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-lg font-medium mb-4">Add User Account</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="name"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="publicAddress"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        {role === "student" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="faculty"
            >
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
        )}
        {role === "student" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="level"
            >
              Level
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="level"
              type="text"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add User
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;