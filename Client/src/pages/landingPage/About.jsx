import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-pink-50 to-rose-100 min-h-screen">
        {/* Hero Section */}
        <img src="src/img/SubBanner1.webp" alt="" srcset="" />
        <section className="relative bg-gradient-to-r from-rose-200 to-pink-100 py-16 text-center">
          <div className="max-w-4xl mx-auto px-6 ">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Sindhutai Sapkal Foundation
        </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Uplifting, enabling, and empowering orphaned children and
              destitutes to live a life of dignity.
            </p>
          </div>
        </section>
        <div className="bg-pink-50 rounded-xl p-6 shadow-sm p-15 m-6">
          {/* <img src="src/img/work.JPG" alt="" srcset="" /> */}
          <h3 className="text-center text-3xl md:text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-lg md:text-xl text-gray-700"> 
            
            वंचित घटकांच्या समस्यांवर काम करून त्यांच्या सर्वांगीण
            विकासासाठी, उन्नतीसाठी जात, धर्म, पंथ, लिंग याबाबत कुठलाही भेदभाव न
            करता अनाथ, निराधार, गरीब, गरजू, दुर्बल, दुर्लक्षित या सर्व घटकासाठी
            प्रयत्नशील राहून त्यांना सक्षम करणे व त्यांचे योग्य प्रकारे पुनर्वसन
            करून त्यांच्या जगण्याचा स्तर उंचावणे साठी आणि समाजातील मुख्य
            प्रवाहात आनण्या करिता त्यांना यथायोग्य जि मदत करता येईल त्यासाठी
            संस्थे मार्फत सर्वतोपरी प्रयत्न करण्यासाठी आम्ही बांधील आहोत.
         
          </p>
        </div>

        {/* About Content */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We are a dedicated NGO committed to uplifting, enabling, and
              empowering
              <span className="font-semibold text-rose-600">
                {" "}
                orphaned children and destitute individuals
              </span>
              . Our mission is to provide not just shelter, but also{" "}
              <strong>education, emotional support, and opportunities</strong>
              that enable them to become{" "}
              <strong>self-reliant and independent</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {/* Mission */}
              <div className="bg-pink-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🎯 Our Mission
                </h3>
                <p className="text-gray-700">
                  To create a world where no child feels abandoned and every
                  person has the opportunity to live with dignity and hope.
          </p>
        </div>

              {/* Community Work */}
              <div className="bg-pink-50 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🌱 What We Do
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Run orphanages and educational programs.</li>
                  <li>Empower women, widows, and single mothers.</li>
                  <li>
                    Support Melghat communities with healthcare and resources.
                  </li>
                  <li>Promote culture and social harmony through events.</li>
                </ul>
              </div>
            </div>

            {/* Culture & Education */}
            <div className="bg-pink-50 rounded-xl p-6 shadow-sm mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                📚 Education & Culture
              </h3>
              <p className="text-gray-700">
                We believe education is the strongest tool for transformation.
                Our programs focus on bringing quality education to
                underprivileged children, especially in rural and tribal regions
                like Melghat. Along with this, we organize cultural programs to
                preserve and celebrate the unique heritage of these regions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              📞 Contact Us
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>
                  Sau. Sindhutai Sapkal Janvikas Samajik Bahu. Foundation,
                  Chikhaldara, Amravati
                </span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5 text-rose-600" />
                <span>9422232044 | 9767929394</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5 text-rose-600" />
                <span>sindhutaisapkalfoundation@gmail.com</span>
              </p>
            </div>
          </div>
        </section>

        {/* Closing Line */}
        <div className="text-center pb-10">
          <p className="text-gray-700 text-lg flex justify-center items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-600" />
            <span>
              Together, we can give every child a chance to dream again.
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default About;
