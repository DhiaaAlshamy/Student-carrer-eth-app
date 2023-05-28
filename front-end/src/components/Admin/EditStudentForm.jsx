import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CourseModal } from "../Ui";
import StudentInfo from "../StudentInfo";

function EditStudent({ drizzle, drizzleState, studentIndex, onClose }) {
  const [studentData, setStudentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesBySemester, setCoursesBySemester] = useState({});

  // ...

  const handleShowCourses = async (semesterId) => {
    const contract = drizzle.contracts.StudentsStore;

    // Get the course codes for the semester
    const courseCodes = await contract.methods
      .getStudentCourses(id, semesterId)
      .call();

    // Fetch the full course information for each course code
    const coursesForSemester = await Promise.all(
      courseCodes.map(async (courseCode) => {
        const course = await contract.methods
          .getStudentCourse(id, semesterId, courseCode)
          .call();
        return course;
      })
    );

    setCoursesBySemester((prevCourses) => ({
      ...prevCourses,
      [semesterId]: coursesForSemester,
    }));
  };

  const [semester, setSemester] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const contract = drizzle.contracts.StudentsStore;

    // Fetch the student's information
    const fetchData = async () => {
      const student = await contract.methods.getStudentInfo(id).call();
      setStudentData(student);
      console.log(student);
    };

    fetchData();
  }, [drizzle, id]);

  const handleAddSemester = async () => {
    const contract = drizzle.contracts.StudentsStore;

    await contract.methods.addSemester(id, semester).send();

    // Clear the input field
    setSemester("");
  };


  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
  };


  const [courseInputs, setCourseInputs] = useState({});



  // Function to handle removing a course from a semester
  const handleRemoveCourse = (semesterId, courseIndex) => {
    setCourseInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs };
      delete updatedInputs[semesterId][courseIndex];
      return updatedInputs;
    });
  };

  const handleSaveCourse = async (semesterId, course) => {
    const contract = drizzle.contracts.StudentsStore;
    const semesterIndex = semesterId; // Adjust for zero-based indexing

    // Extract the individual values
    const { courseCode, courseName, maxGrade ,studentGrade} = course;

    // Make the contract method call to save the course
    await contract.methods
      .addCourse(id, semesterIndex, courseCode, courseName, maxGrade,studentGrade)
      .send();

    // Optional: Perform any additional operations or updates after saving the course
  };


  const onModalClose = () => {
    setIsModalOpen(false)
  }

  if (!studentData) {
    return <p>Loading student data...</p>;
  }

  const semesters = studentData[5] || [];

  return (
    <div className="bg-white p-4">
     

      <StudentInfo  studentData={studentData}/>
      <div className="mt-4">
        <h3 className="text-md font-medium">Add Semester</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={semester}
            onChange={handleChangeSemester}
            placeholder="Enter semester"
            className="border border-gray-300 rounded px-2 py-1 flex-grow"
          />
          <button
            onClick={handleAddSemester}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-medium">Semesters</h3>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Semester</th>
              <th className="px-4 py-2">Courses</th>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semesterId) => (
              <tr key={semesterId}>
                <td className="border px-4 py-2">Semester {semesterId}
                  <button onClick={() => handleShowCourses(semesterId)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 ml-4 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only"> Show courses</span>
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Course Code</th>
                        <th className="px-4 py-2">Course Name</th>
                        <th className="px-4 py-2">Max Grade</th>
                        <th className="px-4 py-2">Student Grade</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(coursesBySemester[semesterId])}
                      {coursesBySemester[semesterId] &&
                        coursesBySemester[semesterId].map((course) => (
                          <tr>
                            <td className="border px-4 py-2">{course}</td>
                            <td className="border px-4 py-2">{course.courseName}</td>
                            <td className="border px-4 py-2">{course.maxGrade}</td>
                            <td className="border px-4 py-2">{course.studentGrade}</td>
                            <td className="border px-4 py-2">
                              <button
                                onClick={() =>
                                  handleRemoveCourse(semesterId)
                                }
                                className="text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSemester(semesterId);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Course
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4">
            <h2 className="text-lg font-semibold mb-2">Add Course</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <div>
              {/* Render the course inputs inside the modal */}
              <CourseModal isOpen={isModalOpen} onClose={onModalClose} onSave={handleSaveCourse} semester={semester}></CourseModal>
            </div>
          </div>
        </div>

      )}
    </div>

  );
}

export default EditStudent;
