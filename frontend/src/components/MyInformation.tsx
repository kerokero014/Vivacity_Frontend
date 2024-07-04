"use client";
import { useState, useEffect } from "react";
import { fetchInfo } from "../utils/requests.mts";
import Info from "../Data/Info.model";
import myPic from "../assets/myPic.jpg";

export default function MyInformation() {
  const [info, setInfo] = useState<Info[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    if (showInfo) {
      const loadInformation = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await fetchInfo(
            "http://localhost:3000/awesome/applicant"
          );
          setInfo(data);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
          else setError("An unknown error occurred");
        } finally {
          setLoading(false);
        }
      };

      loadInformation();
    }
  }, [showInfo]);

  const handleImageClick = () => {
    setShowInfo((prevShowInfo) => !prevShowInfo); // Toggle showInfo state
  };

  return (
    <div className="main__section">
      <div className={`image__container ${showInfo ? "info__shown" : ""}`}>
        <img
          src={myPic}
          alt="Show Information"
          className="image__button"
          onClick={handleImageClick}
        />
        {showInfo && (
          <div className="info__overlay">
            {!loading && !error ? (
              <ul className="info__list">
                {info.map((item) => (
                  <li key={item.id} className="info__item">
                    <h1 className="info__name">
                      {item.first_name} {item.last_name}
                    </h1>
                    <h2 className="who_i_am">{item.who_i_am}</h2>
                    <h3 className="info__email">{item.email}</h3>

                    <h4 className="info__hobbies">Hobbies:</h4>
                    <ul className="hobbies">
                      {Array.isArray(item.hobbies) &&
                        item.hobbies.map((hobby: string, index: number) => (
                          <li key={index}>{hobby}</li>
                        ))}
                    </ul>
                    <h4 className="info__facts">Fun Facts:</h4>
                    <ul className="facts">
                      {Array.isArray(item.fun_facts) &&
                        item.fun_facts.map((fact: string, index: number) => (
                          <li key={index}>{fact}</li>
                        ))}
                    </ul>
                    <p className="info__address">{item.address}</p>
                    <a href={item.github} className="info_github">
                      <p>GitHub</p>
                    </a>
                    <a href={item.linkedin} className="info_linkedin">
                      <p>LinkedIn</p>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="loading">Loading...</div>
            )}
            {error && <div className="error">Error: {error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
