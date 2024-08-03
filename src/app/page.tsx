"use client";

import { useEffect, useState } from "react";

type ErrorType = {
  code: number;
  message: string;
};

const errors: ErrorType[] = [
  { code: 400, message: "Bad Request" },
  { code: 401, message: "Unauthorized" },
  { code: 402, message: "Payment Required" },
  { code: 403, message: "Forbidden" },
  { code: 405, message: "Method Not Allowed" },
  { code: 406, message: "Not Acceptable" },
  { code: 407, message: "Proxy Authentication Required" },
  { code: 408, message: "Request Timeout" },
  { code: 409, message: "Conflict" },
  { code: 410, message: "Gone" },
  { code: 411, message: "Length Required" },
  { code: 412, message: "Precondition Failed" },
  { code: 413, message: "Payload Too Large" },
  { code: 414, message: "URI Too Long" },
  { code: 415, message: "Unsupported Media Type" },
  { code: 416, message: "Range Not Satisfiable" },
  { code: 417, message: "Expectation Failed" },
  { code: 418, message: "I'm a teapot" },
  { code: 421, message: "Misdirected Request" },
  { code: 422, message: "Unprocessable Entity" },
  { code: 423, message: "Locked" },
  { code: 424, message: "Failed Dependency" },
  { code: 425, message: "Too Early" },
  { code: 426, message: "Upgrade Required" },
  { code: 428, message: "Precondition Required" },
  { code: 429, message: "Too Many Requests" },
  { code: 431, message: "Request Header Fields Too Large" },
  { code: 451, message: "Unavailable For Legal Reasons" },
  { code: 500, message: "Internal Server Error" },
];

function Home() {
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setError(randomError);
  }, []);

  if (error) {
    throw new Error(`${error.code} ${error.message}`);
  }

  return <div>Home</div>;
}

export default Home;
