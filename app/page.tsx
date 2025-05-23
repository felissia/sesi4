import Image from "next/image"

export default function AboutMe() {
  const profile = {
    name: "Felicia Teja Irawan",
    title: "Computer Science Undergraduate",
    bio: "Passionate computer science student currently exploring the fascinating world of web applications. I enjoy solving complex problems and creating intuitive user experiences. When I'm not coding, you can find me painting, reading, or exploring nearby park.",
    avatar: "/images/profile.png",
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
            <Image src={profile.avatar || "/placeholder.svg"} alt={profile.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{profile.name}</h1>
            <p className="text-gray-600 mb-4">{profile.title}</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About Me</h2>
            <div className="h-px bg-gray-200 my-3"></div>
            <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Personal Details</h2>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="text-gray-800">Alam Sutera, Tangerang</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nationality</h3>
            <p className="text-gray-800">Indonesian</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Languages</h3>
            <p className="text-gray-800">Indonesia (Native), English (Intermediate)</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Interests</h3>
            <p className="text-gray-800">Painting, Reading, Exploring</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Education</h2>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-gray-800">Bina Nusantara University, Tangerang</h3>
              <span className="text-sm text-gray-500">2023 - 2027</span>
            </div>
            <p className="text-gray-600">Bachelor of Science in Computer Science</p>
            <p className="text-gray-500 text-sm">4th Semester, Streaming Artificial Intelligence</p>
          </div>
        </div>
      </div>
    </div>
  )
}

