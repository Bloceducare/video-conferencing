'use client'
// import { Button } from '@/types';

const HomepageButton = () => {
  return (
    <div className="flex justify-center gap-1">
      <button className="btn text-white hover:text-black bg-black  hover:bg-white border-solid border-white ">
        Register
      </button>
      <button className="btn text-black hover:text-white bg-white  hover:bg-black border-solid border-black hover:border-white ">
        Login
      </button>
    </div>
  );
};

export default HomepageButton;
