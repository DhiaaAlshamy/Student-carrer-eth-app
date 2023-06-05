import React from "react";
import { FaUser, FaEnvelope, FaUserTag, FaAddressCard } from "react-icons/fa";
import TokenBalance from "./TokenBalance";

const Profile = ({props}) => {
  return (
    <>
      <div className="flex flex-col min-w-max items-center mt-10">
        <h1 className="text-3xl font-bold mb-10">My Profile</h1>
        <div className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
          <div className="mb-6 flex items-center">
            <FaUser className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold " htmlFor="name">
              Name:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{props.name}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaEnvelope className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold " htmlFor="email">
              Email:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{props.email}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaUserTag className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold " htmlFor="role">
              Role:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{props.role}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaAddressCard className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold " htmlFor="public-address">
              Public Address:
            </label>
            <p className="text-gray-700 ml-2 px-2 py-1 border border-gray-300 rounded">{props.publicAddress}</p>
          </div>
          <div className="mb-6 flex items-center">
            <FaAddressCard className="text-gray-700 mr-2" />
            <label className="block text-gray-700 font-bold " htmlFor="public-address">
              Token Balance:
            </label>
            <TokenBalance tokenName="My Token"/>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Profile;
