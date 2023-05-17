import React, { useState } from "react";

function AddStudent({ drizzle, drizzleState }) {
  const [universityID, setUniversityID] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [submissionYear, setSubmissionYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const contract = drizzle.contracts.StudentsStore;
      const addStudentTx = contract.methods.addStudent(
        universityID,
        name,
        program,
        submissionYear
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
    <div className="px-4 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Add Student</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="universityID">
            University ID
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type="number"
            name="universityID"
            id="universityID"
            value={universityID}
            onChange={(event) => setUniversityID(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="name">
            Name
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="program">
            Program
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type="text"
            name="program"
            id="program"
            value={program}
            onChange={(event) => setProgram(event.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="submissionYear">
            Submission Year
          </label>
          <input
            className="border py-2 px-3 text-grey-800"
            type="number"
            name="submissionYear"
            id="submissionYear"
            value={submissionYear}
            onChange={(event) => setSubmissionYear(event.target.value)}
            required
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Add Student
          </button>
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}

export default AddStudent;