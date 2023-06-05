import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import useDrizzleContractData from '../../hooks/useDrizzleContractData';


export default function SemesterCourse({ studentId,semesterId,courseId }) {
    const [courseInfo, setCourseInfo] = useState(null);
    const cor = useDrizzleContractData("StudentsStore", "getStudentCourse", studentId, semesterId,courseId).data;
    // const studentInfo = useDrizzleContractData("StudentsStore", "getStudentInfo",student.universityID);

    useEffect(() => {
        setCourseInfo(cor)
        console.log(cor);
    }, [cor]);

    if (!courseInfo) {
        return <p>Loading...</p>;
    }

    return (
                  <li key={courseInfo.courseCode}>
                    <p>Course Name: {courseInfo.courseName}</p>
                    <p>Max Grade: {courseInfo.maxGrade}</p>
                    <p>Your Grade: {courseInfo.studentGrade}</p>
                  </li>

    )
}
