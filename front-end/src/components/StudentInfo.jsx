import React from "react";
import { FaUser, FaEnvelope, FaUserTag, FaAddressCard } from "react-icons/fa";

const StudentInfo = ({ studentData }) => {
    console.log(StudentInfo);
  return (
    <>
      <div className="flex flex-col w-full items-center ">
        <h1 className="text-3xl font-bold mb-10">Student Basic Info </h1>
        <div className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <div className="mb-6 flex items-center">
            <FaUser className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{studentData.name}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaEnvelope className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="program">
              Program:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{studentData.program}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaUserTag className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="submissionYear">
              submission Year:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{studentData.submissionYear}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaAddressCard className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold mb-2" htmlFor="public-address">
              Public Address:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{studentData.publicAddress}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentInfo;
