'use client'

import React, { useLayoutEffect } from "react";
import { GoogleGenAI } from "@google/genai";

const Home = () => {

  useLayoutEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const generateContent = async () => {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works",
      });
      console.log(response.text);
    }

    generateContent();
  }, []);


  return (
    <div>
      <h1>Welcome to PlayZone</h1>
    </div>
  )
};

export default Home;

