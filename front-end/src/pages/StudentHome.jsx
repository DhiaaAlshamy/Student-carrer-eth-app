import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Ui'
import { StudentSidebar } from '../components/Student'
import { Outlet } from 'react-router-dom'
import useDrizzleContractData from '../hooks/useDrizzleContractData';


export default function StudentHome() {
  const [student, setStudent] = useState(null);
  const students = useDrizzleContractData("StudentsStore", "getStudents");

  useEffect(() => {
    if (students) {
      const publicAddress = window.ethereum.selectedAddress;
      console.log(students);
      const filteredStudent = students.find((s) => s.publicAddress.toLowerCase() === publicAddress.toLowerCase());
      setStudent(filteredStudent);
      console.log(filteredStudent);
    }
  }, [students]);

  if (!student) {
    return <p>Loading...</p>;
  }



  return (
    <>
    <Layout Navbar={StudentSidebar}>
      <div>
     <Outlet context={[student]} />
      </div>
    </Layout>
  </>
  )
}
