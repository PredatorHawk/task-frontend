'use client';
import Filter from "@/components/Filter";
import { useState } from 'react';

interface ResponseData {
  is_success?: boolean;
  message?: string;
  user_id?: string;
  email?: string;
  roll_number?: string;
  numbers?: string[];
  alphabets?: string[];
  highest_lowercase_alphabet?: string[];
  error?: string;
}

const getData = async (data: { data: string[] }): Promise<ResponseData> => {
  try {
    const response = await fetch('https://bajaj-finserv-240k.onrender.com/bfhl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return { error: error.message };
  }
};

export default function Home() {
  const [req, setReq] = useState<string>('');
  const [response, setResponse] = useState<ResponseData>({});

  const handleClick = async () => {
    try {
      const parsedData = JSON.parse(req);
      const result = await getData(parsedData); // Send parsed data
      setResponse(result); // Set the response state
    } catch (error) {
      console.error('Error parsing input:', error);
      setResponse({ error: 'Invalid JSON format' }); // Handle JSON parse errors
    }
  };

  return (
    <main className="bg-[#4D54FF] h-full w-full">
      <div className="flex h-full w-full justify-center gap-[1rem] items-center flex-col">
        <div className="border-solid border-[#9CA0FF] border-[1px] rounded-[1rem] w-[80%]">
          <div className="relative">
            <input
              placeholder='Enter JSON {"data": ["m", "2"]}'
              onChange={(e) => setReq(e.target.value)}
              className="p-[1rem] focus:outline-none text-white rounded-[0.5rem] bg-transparent w-full focus:border-none"
              type="text"
            />
            <span></span>
          </div>
        </div>
        <div className="w-[80%]">
          <button
            type="button"
            onClick={handleClick}
            className="bg-[#181817] text-white p-[1rem] rounded-[0.5rem] w-full"
          >
            Submit
          </button>
        </div>
        <div className="w-[80%]">
          <Filter />
        </div>
        <div className="w-[80%] mt-[1rem]">
          <pre className="bg-[#1E1E1E] text-white p-[1rem] rounded-[0.5rem]">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
