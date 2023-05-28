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
    setCourseInput(prevCourseInput => ({
      ...prevCourseInput,
      [name]: value
    }));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4">
            <h2 className="text-lg font-semibold mb-2">Add Course</h2>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Close
            </button>
            <div>
              <div>
                <label>Course Code:</label>
                <input
                  type="text"
                  value={courseInput.courseCode}
                  onChange={(event) =>
                    handleCourseInputChange(event, "courseCode")
                  }
                  className="border border-gray-300 rounded px-2py-1"
                />
                <label>Course Name:</label>
                <input
                  type="text"
                  value={courseInput.courseName}
                  onChange={(event) =>
                    handleCourseInputChange(event, "courseName")
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <label>Max Grade:</label>
                <input
                  type="text"
                  value={courseInput.maxGrade}
                  onChange={(event) =>
                    handleCourseInputChange(event, "maxGrade")
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <label>Student Grade:</label>
                <input
                  type="text"
                  value={courseInput.studentGrade}
                  onChange={(event) =>
                    handleCourseInputChange(event, "studentGrade")
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => {
                  onClose();
                  onSave(semester,courseInput);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseModal;