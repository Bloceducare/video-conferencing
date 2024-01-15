'use client';
import { useMeetingCardStore } from '@/hooks/useAPIStore';
import useAxios from '@/hooks/useAxios';
import { MeetingCardType } from '@/types';
import Student from './student';
import { useEffect } from 'react';

const MeetingCards = () => {
  const { setMeetingCardData } = useMeetingCardStore.getState();
  const { data, error, isLoading } = useAxios('https://w3bvc.onrender.com/v1/livekit/room', 'get', {
    headers: {
      'Content-Type': 'application/json',
    },
  });


  // useEffect to check and set 'access_token' when the component mounts
  useEffect(() => {
    // Get the URL search parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Check if the 'access_token' parameter exists
    if (urlSearchParams.has('access_token')) {
      const accessToken: string | null = urlSearchParams.get('access_token');
      if (accessToken !== null) {
        localStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('access_token', accessToken);
        // Remove the 'access_token' from the URL to avoid showing it in the address bar
        urlSearchParams.delete('access_token');

        // Update the browser's URL without refreshing the page
        window.history.replaceState({}, document.title, window.location.pathname + '?' + urlSearchParams.toString());

        // Make a call to getUserDetails endpoint
        fetch('https://web3bridgeauth.onrender.com/get-user-details/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            // Set user details in local storage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Set user details in session storage
            sessionStorage.setItem('user', JSON.stringify(data.user));
          })
          .catch(error => {
            console.error('Error fetching user details:', error);
          });
      }
    }
  }, []); 


  if (!isLoading) {
    setMeetingCardData(data as MeetingCardType[]);
  }



  return (
    <>
      <Student />
    </>
  );
};

export default MeetingCards;
