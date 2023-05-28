import React, { useState } from "react";

function AddStudent({ drizzle, drizzleState }) {
  const [universityID, setUniversityID] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [submissionYear, setSubmissionYear] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const contract = drizzle.contracts.StudentsStore;
      const addStudentTx = contract.methods.addStudent(
        universityID,
        name,
        program,
        submissionYear,
        email,
        publicAddress
      );
      const gasLimit = await addStudentTx.estimateGas();
      await addStudentTx.send({
        from: drizzleState.accounts[0],
        gas: gasLimit,
      });
      setErrorMessage("");
      alert("Student added successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error adding student. Please try again.");
    }
  };

  return (
    <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="universityID"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          University ID
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="number"
          id="universityID"
          value={universityID}
          onChange={(event) => setUniversityID(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="program"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Program
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="text"
          id="program"
          value={program}
          onChange={(event) => setProgram(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="submissionYear"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Submission Year
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="number"
          id="submissionYear"
          value={submissionYear}
          onChange={(event) => setSubmissionYear(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="publicAddress"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Public Address
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          type="text"
          id="publicAddress"
          value={publicAddress}
          onChange={(event) => setPublicAddress(event.target.value)}
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
      )}
    </form>
  );
}

export default AddStudent;
