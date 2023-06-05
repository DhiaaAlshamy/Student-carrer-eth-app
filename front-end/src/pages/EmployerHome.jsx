import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Ui';
import { EmployerSidebar } from '../components/Employer';
import { Outlet } from 'react-router-dom';
import useDrizzleContractData from '../hooks/useDrizzleContractData';
export default function EmployerHome() {
  const [employer, setEmployer] = useState(null);
  const employers = useDrizzleContractData("UsersStore", "getAllUsers").data;
  useEffect(() => {
    if (employers) {
      const publicAddress = window.ethereum.selectedAddress;
      console.log(employers);
      const filteredEmployer = employers.find(s => s.publicAddress.toLowerCase() === publicAddress.toLowerCase());
      setEmployer(filteredEmployer);
      console.log(filteredEmployer);
    }
  }, [employers]);

  if (!employer) {
    return <p>Loading...</p>;
  }

  return <>
    <Layout Navbar={EmployerSidebar}>
      <div>
     <Outlet context={[employer]} />
      </div>
    </Layout>
  </>;
}