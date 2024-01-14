"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [cohort, setCohort] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const toggleMenu = () => {
    // Add any menu toggle logic here
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password || !name || !stack || !cohort || !email) {
      toast.error('Please fill in all the details.');
      return;
    }

    setLoading(true);

    const formData = {
      username: username,
      password: password,
      name: name,
      stack: stack,
      cohort: cohort,
      email: email,
    };

    try {
      const response = await fetch('https://web3bridgeauth.onrender.com/accounts/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Save data to session storage
      sessionStorage.setItem('access_token', data.access_token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      // Save data to local storage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Handle successful response
      toast.success('Sign Up success');
      console.log(data);

      // Redirect to another page if needed
      router.push('/dashboard'); // replace '/dashboard' with your desired route
    } catch (error) {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   // Optional: Check if user is already logged in (e.g., after a page refresh)
  //   const storedToken = sessionStorage.getItem('access_token');
  //   const storedUser = sessionStorage.getItem('user');

  //   if (storedToken && storedUser) {
  //     // Redirect to another page if needed
  //     router.push('/dashboard'); // replace '/dashboard' with your desired route
  //   }
  // }, []);

  return (
    <div className="flex flex-col gap-4 w-1/2 m-auto kodchasan">
      <form
        method="post"
        id="signup-form"
        onSubmit={handleSubmit}
        className=" w-full flex flex-col  m-auto kodchasan"
      >
        <div className="m-auto flex flex-col">
          <p className="font-[700] text-[2.25em] kodchasan">Web3bridge Meet</p>
          <span className='text-[#0456DD] font-[700] text-[1.5em] kodchasan text-center'>Sign Up</span>
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
          Password
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

        <label className="label font-bold" htmlFor="name">
          Name
        </label>
        <input
          className="border border-[#808080] bg-none rounded-lg"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="label font-bold" htmlFor="stack">
          Class/Stack
        </label>
        <select
          className="border border-[#808080] bg-none rounded-lg"
          id="stack"
          name="stack"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          required
        >
          <option value="" disabled selected></option>
          <option value="Cartesi">Cartesi</option>
          <option value="Web3">Web3</option>
          <option value="Web2">Web2</option>
        </select>

        <label className="label font-bold" htmlFor="cohort">
          Cohort
        </label>
        <select
          className="border border-[#808080] bg-none rounded-lg"
          id="cohort"
          name="cohort"
          value={cohort}
          onChange={(e) => setCohort(e.target.value)}
          required
        >
          <option value="" disabled selected></option>
          <option value="Cartesi">Cartesi</option>
          <option value="Web3">Web3</option>
          <option value="Web2">Web2</option>
        </select>

        <label className="label font-bold" htmlFor="email">
          Email Address
        </label>
        <input
          className="border border-[#808080] bg-none rounded-lg"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      <div className="flex items-center w-full mt-4 ">
        <hr className="border-t border-gray-500 flex-grow" />
        <div className="mx-auto ">or sign up with</div>
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

export default SignUp;
