'use client'
// import { Button } from '@/types';
import useRegisterStore from '@/hooks/useRegisterStore';

const HomepageButton = () => {
  // destructure the data and the function to get data
  const {data, setData} = useRegisterStore();

  const handleClick = async () => {
    // await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => setData([...data, ...json]))
    //   .catch(err => console.log(err));
    setData([...data, {
      title: 'Web3 Stack',
      cohort: 'Cohort X',
      room: 'Room I',
      description: 'Live Webinar',
      image: '/images/webinar.png',
      link: '#',
    }]);
  };

  return (
    <div className="flex justify-center gap-1">
      <button onClick={handleClick} className="btn text-white hover:text-black bg-black  hover:bg-white border-solid border-white ">
        Register
      </button>
      <button className="btn text-black hover:text-white bg-white  hover:bg-black border-solid border-black hover:border-white ">
        Login
      </button>
    </div>
  );
};

export default HomepageButton;
