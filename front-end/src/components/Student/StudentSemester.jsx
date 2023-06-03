import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import useDrizzleContractData from '../../hooks/useDrizzleContractData';
import SemesterCourse from './SemesterCourse';


export default function StudentSemester({ semesterId }) {
    const [student] = useOutletContext();
    const [semesterCourses, setSemesterCourses] = useState(null);
    const sem = useDrizzleContractData("StudentsStore", "getStudentCourses", student.universityID, semesterId);
    // const studentInfo = useDrizzleContractData("StudentsStore", "getStudentInfo",student.universityID);

    useEffect(() => {
        setSemesterCourses(sem)
        console.log(sem);
    }, [sem]);

    if (!semesterCourses) {
        return <p>Loading...</p>;
    }

    return (
        <ul className="space-y-2">
            {semesterCourses?.map((courseCode) => (
                <li key={courseCode} className="border rounded p-4">
                    <h3 className='font-bold'>{courseCode} </h3>

                <SemesterCourse courseId={courseCode} semesterId={semesterId}/>
                </li>
            ))}

        </ul>
    )
}
