"use client";
import React, { useEffect, useState } from "react";

type Experience = {
  id: string;
  company: string;
  position: string;
  duration: string;
  jobdesk: string;
  durationend: string;
};

export default function Page() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto ">
      {/* Profile Card */}
      <div className="py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-lg shadow-lg border dark:border-neutral-700 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-[#c9d1d9]">
          <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-2 rounded-t-lg font-mono text-xs text-green-600 dark:text-green-400">
            ~/about/profile
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              name ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;Qurrota Ayun&quot;
              </span>
              ;
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              role ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;Frontend || Backend || Full Stack Developer&quot;
              </span>
              ;
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              location ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;Indonesia&quot;
              </span>
              ;
            </p>
            <br />
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              summary ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                `I build more than just code—I build solutions. To me, failure
                is never the end, but the beginning of something far greater.`
              </span>
              ;
            </p>
          </div>
        </div>

        {/* Education Card */}
        <div className="rounded-lg shadow-lg border dark:border-neutral-700 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-[#c9d1d9]">
          <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-2 rounded-t-lg font-mono text-xs text-blue-600 dark:text-blue-400">
            ~/about/education
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              degree ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;S1 Teknik Informatika&quot;
              </span>
              ;
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              university ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;Universitas Nusa Mandiri&quot;
              </span>
              ;
            </p>
            <p>
              <span className="text-purple-600 dark:text-purple-400">
                const
              </span>{" "}
              year ={" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                &quot;2019 - 2023&quot;
              </span>
              ;
            </p>
          </div>
        </div>
      </div>

      {/* Work Experience Card */}
      <div className="rounded-lg shadow-lg border dark:border-neutral-700 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-[#c9d1d9]">
        <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-2 rounded-t-lg font-mono text-xs text-pink-600 dark:text-pink-400">
          ~/about/work_experience
        </div>
        <div className="p-5 font-mono text-sm leading-relaxed">
          <p>
            <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
            experiences = [
          </p>
          {experiences.map((exp) => (
            <div key={exp.id} className="ml-4 mb-4">
              <p>
                &#123; company:{" "}
                <span className="text-yellow-600 dark:text-yellow-400">
                  &quot;{exp.company}&quot;
                </span>
                ,
              </p>
              <p>
                position:{" "}
                <span className="text-yellow-600 dark:text-yellow-400">
                  &quot;{exp.position}&quot;
                </span>
                ,
              </p>
              <p>
                duration Start:{" "}
                <span className="text-yellow-600 dark:text-yellow-400">
                  &quot;
                  {new Date(exp.duration).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                  &quot;
                </span>{" "}
                &#125;
              </p>
              <p>
                duration end:{" "}
                <span className="text-yellow-600 dark:text-yellow-400">
                  &quot;
                  {new Date(exp.durationend).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                  &quot;
                </span>{" "}
                &#125;
              </p>
            </div>
          ))}
          <p>];</p>
        </div>
      </div>
    </div>
  );
}
