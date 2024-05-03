"use client";

import React, { useState, useEffect } from "react";
import { Fixture, fetchFixtures } from "../../utils/football";
import Loading from "@/app/Components/Loading";

const FixturesComponent: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFixtures()
      .then((data) => {
        setFixtures(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );

  return (
    <div className="bg-[whitesmoke] shadow  p-4 mx-auto my-6 max-w-4xl">
      <h1 className="text-center text-3xl font-bold text-[#5e17eb] mb-3">
        Football Fixtures
      </h1>
      <p className="text-center text-slate-600 mb-4">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {fixtures.length > 0 ? (
        <div className="space-y-3">
          {fixtures.map((fixture) => (
            <div key={fixture._id} className="bg-slate-50 p-3 rounded-md">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-semibold text-slate-800">
                  {fixture.league}
                </span>
                <span className="text-sm text-green-600">{fixture.time}</span>
              </div>
              <div className="text-center text-lg font-semibold text-[#5e17eb]">
                {fixture.teamOne} vs {fixture.teamTwo}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500">
          No fixtures available at this time.
        </p>
      )}
    </div>
  );
};

export default FixturesComponent;
