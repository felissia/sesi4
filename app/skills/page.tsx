export default function SkillsPage() {
  const skills = {
    technical: [
      { name: "React", level: 70 },
      { name: "Next.js", level: 65 },
      { name: "JavaScript", level: 65 },
      { name: "C", level: 80 },
      { name: "Python", level: 75 },
      { name: "HTML/CSS", level: 70 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 65 },
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Project Management",
      "Adaptability",
      "Time Management",
    ],
    tools: ["Git", "VS Code", "Figma", "Google Colab", "Notion", "Microsoft Teams"],
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Skills</h1>
        <p className="text-gray-600 mb-4">A comprehensive overview of my technical abilities and expertise.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Technical Skills</h2>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="space-y-4">
          {skills.technical.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">{skill.name}</span>
                <span className="text-gray-500 text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Soft Skills</h2>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="flex flex-wrap gap-2">
          {skills.soft.map((skill) => (
            <span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Tools & Technologies</h2>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="flex flex-wrap gap-2">
          {skills.tools.map((tool) => (
            <span key={tool} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
