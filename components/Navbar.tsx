import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Image
             src={"/logo.png"}
             width={190}
              height={50}
             alt='Logo'/>
            <span className="ml-2 text-xl font-bold text-gray-800">
             
            </span>
          </div>
          <div className="flex items-center">
            <div className="mr-4">
              {/* Placeholder for user avatar */}
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
