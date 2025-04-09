'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

// This is the root page, currently not actively used as main content is in /home
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Text with custom class for color fill animation */}
        <p className="loading-text-fill text-4xl font-bold">
          AI 놀이터
        </p>
      </div>
    </div>
  );
};

const RootPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/home'); // Redirect to /home after loading
    }, 1000); // 1 second delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]); // Add router to dependency array

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Optional: You could render something briefly here before redirect happens,
  // but usually, the redirect is fast enough.
  // Or return null if you only want the loading screen then redirect.
  return null; 
};

export default RootPage;

