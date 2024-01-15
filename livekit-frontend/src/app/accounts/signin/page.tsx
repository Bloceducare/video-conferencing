'use client';
import React, { useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const SignIn: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const activateButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Add any button activation logic here
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error('Please fill in all the details.');
      return;
    }
    setLoading(true);
    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://web3bridgeauth.onrender.com/accounts/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data)
        throw new Error(data.error);
      }

      // Handle successful response
      toast.success('Login success');
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (error:any) {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-1/2 m-auto kodchasan">
      <form
        method="post"
        id="signin-form"
        onSubmit={handleSubmit}
        className=" w-full flex flex-col  m-auto kodchasan"
      >
        <div className="m-auto flex flex-col">
          <p className="font-[700] text-[2.25em] kodchasan">Web3bridge Meet</p>
            <span className='text-[#0456DD] font-[700] text-[1.5em] kodchasan text-center'>Log in</span>
          
        </div>

        <label className="label font-bold" htmlFor="Username">
          Username
        </label>
        <input
          className="border border-[#808080] bg-none rounded-lg"
          type="text"
          id="Username"
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="label font-bold" htmlFor="password">
          password:
        </label>
        <input
          className="border border-[#808080] bg-none rounded-lg"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className=" sm:mt-4 flex justify-between w-full items-center align-bottom mb-4">
          <div className="flex items-center gap-2 text-center">
            <input
              className="p-0 border-[#808080] focus:border-black hover:bg-black focus:bg-black ring-black checked:bg-black"
              type="checkbox"
              name="remember-me"
              id="remember-checkbox"
            />
            <label
              className="text-[0.8em] h-fit p-0 text-center align-middle"
              htmlFor="remember-checkbox"
            >
              Remember this device
            </label>
          </div>

          <a href="/accounts/reset_password/" className="text-[#C22727] justify-end">
            Forgot Password?
          </a>
        </div>

        <button
          className={`bg-[#131313] w-1/2 m-auto flex items-center text-center text-[#FEFEFE] rounded-[1em] py-2 hover:bg-black justify-center ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>

      <div className="flex items-center w-full mt-4 ">
        <hr className="border-t border-gray-500 flex-grow" />
        <div className="mx-auto ">or log in with</div>
        <hr className="border-t border-gray-500 flex-grow" />
      </div>

      <a
        href="https://web3bridgeauth.onrender.com/accounts/github/login/"
        target="blank"
        className="w-1/3 flex gap-4 border-[#808080] border m-auto rounded-lg py-1 items-center justify-center mt-2"
      >
        <Image src="/githublogo.png" alt="GitHub__logo" width={30} height={30} />
        GitHub
      </a>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
