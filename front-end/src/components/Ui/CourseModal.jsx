import React, { useState } from "react";

function CourseModal({ isOpen, onClose, onSave, semester }) {
  const [courseInput, setCourseInput] = useState({
    courseCode: "",
    courseName: "",
    maxGrade: "",
    studentGrade: "",
  });

  // The function should take an event as a parameter and extract the updated value
  const handleCourseInputChange = (event, name) => {
    const value = event.target.value;
    setCourseInput((prevCourseInput) => ({
      ...prevCourseInput,
      [name]: value,
    }));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10  bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Add Course</h2>
            <div>
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700">Course Code:</span>
                  <input
                    type="text"
                    value={courseInput.courseCode}
                    onChange={(event) => handleCourseInputChange(event, "courseCode")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Course Name:</span>
                  <input
                    type="text"
                    value={courseInput.courseName}
                    onChange={(event) => handleCourseInputChange(event, "courseName")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Max Grade:</span>
                  <input
                    type="text"
                    value={courseInput.maxGrade}
                    onChange={(event) => handleCourseInputChange(event, "maxGrade")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Student Grade:</span>
                  <input
                    type="text"
                    value={courseInput.studentGrade}
                    onChange={(event) => handleCourseInputChange(event, "studentGrade")}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  onClose();
                  onSave(semester, courseInput);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
              className="bg-red-500 hover:bg-red-700 ml-4 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseModal;
