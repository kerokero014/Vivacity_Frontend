"use client";
import { useState, useEffect } from "react";
import { fetchInfo } from "../utils/requests.mts";
import Info from "../Data/Info.model";

export default function MyInformation() {
  const [info, setInfo] = useState<Info[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await fetchInfo("http://localhost:8000/awesome/applicant");
        console.log(data);
        setInfo(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    loadInfo();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="main__section">
      <h2>My Information</h2>
      <ul>
        {info.map((info) => (
          <li key={info.id}>
            <h3>{info.first_name}</h3>
            <p>{info.last_name}</p>
            <p>{info.email}</p>
            <p>{info.phone}</p>
            <p>{info.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
