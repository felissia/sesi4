export default function ExperiencePage() {
  const experiences = [
    {
      company: "Yos Sudarso High School",
      role: "House Manager",
      period: "March 2022 - April 2022",
      location: "Batam, Kepulauan Riau",
      description:
        "Managing seats and audience flow for SMAKYS Movie Night Audience.",
      achievements: [
        "Accelerates student flow to the school theatre ensuring smooth mass flow.",
        "Keeping safe condition at the Event, ensuring enjoyable moment for all audience.",
        "Team working with House Manager teams consists of 20 people to manage audience flow (estimated 300 audience).",
      ],
    },
    {
      company: "Yos Sudarso High School",
      role: "Decoration Team",
      period: "March 2022 - April 2022",
      location: "Batam, Kepulauan Riau",
      description:
        "Developed and maintained multiple decorations and ornaments used for decorating the hall of the Prom Night Event.",
      achievements: [
        "Praised by the prom audience for the hand built photobooth themed secret mission.",
        "Reduced audience waiting time by 30% through strategic flow optimization.",
        "Building loads of photobooth property enchancing photobooth experience for prom audience.",
      ],
    },
    {
      company: "Bina Nusantara University",
      role: "Prototype Development Team",
      period: "March 2024 - May 2024",
      location: "Alam Sutera, Tangerang",
      description:
        "Assisted in the development of web prototype and participated in all phases of web development.",
      achievements: [
        "Contributed to the development of web renting project.",
        "Designed and implemented a security schema that improved web security requirements.",
        "Created documentation that streamlined onboarding process for FrontEnd Developer Team.",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Experience</h1>
        <p className="text-gray-600 mb-4">My professional journey and career achievements.</p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{exp.company}</h2>
                <p className="text-gray-600">{exp.role}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500 block">{exp.period}</span>
                <span className="text-sm text-gray-500 block">{exp.location}</span>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-3"></div>
            <p className="text-gray-600 mb-4">{exp.description}</p>

            <h3 className="text-md font-medium text-gray-700 mb-2">Key Achievements:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-gray-600">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
