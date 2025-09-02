import { useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/contact')
  }

  return (
    < >
  
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Welcome to our little corner of the internet! 🌍✨
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
          <p>
            Our blog is more than just a collection of articles — it's a community of curious minds who love to explore, learn, and share. We believe that every story, every tip, and every thought can inspire someone, somewhere.
          </p>

          <p>
            Founded in 2025, our mission is to provide high-quality, engaging content across various categories like technology, lifestyle, productivity, creativity, and more. We aim to empower readers with knowledge and spark meaningful conversations.
          </p>

          <p>
            Our team is made up of passionate writers, designers, and tech enthusiasts who are dedicated to delivering authentic and valuable experiences. We’re constantly learning, evolving, and staying updated with the latest trends to bring fresh perspectives.
          </p>

          <p className="font-semibold text-indigo-600">
            Thank you for being part of our journey. We’re excited to continue growing together with you!
          </p>
        </div>

        <div className="mt-10 text-center">
          <button onClick={handleNavigate} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>




    </>
  )
}
export default About