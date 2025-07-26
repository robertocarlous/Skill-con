import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderLandingPage from "../components/HeaderLandingPage";
import pic1 from "../assets/image/pic1.jpg";
import pic2 from "../assets/image/pic2.jpg";
import pic3 from "../assets/image/pic3.jpg";
import pic4 from "../assets/image/pic4.jpg";
import vec1 from "../assets/image/vec1.png";
import vec2 from "../assets/image/vec2.png";
import vec3 from "../assets/image/vec3.png";
import vec4 from "../assets/image/vec4.png";
import flag from "../assets/image/flag.jpg";
import Location from "../components/Location.jsx";
import Footer from "../components/Footer.jsx";
import dot from "../assets/image/dot.png";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const LandingPage = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen scroll-in">
      <HeaderLandingPage />

      <div className="relative min-h-screen flex w-full flex-col gap-4 justify-center items-center text-center px-4 py-12 sm:px-6 space-y-8 bg-white animate-fade-up delay-500">
        <h2 className="text-[3rem] sm:text-4xl md:text-5xl font-switzer animate-bounce bg-gradient-to-r from-[#000000] via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent text-center leading-snug animate-fade-up delay-500">
          Get real jobs. Hire skilled Artisans. <br />
          Pay and get paid securely.
        </h2>
        <img
          src={dot}
          alt="decorative dot"
          className="absolute top-10 left-10 w-6 h-6"
        />
        <img
          src={dot}
          alt="decorative dot"
          className="absolute top-12 right-10 w-6 h-6 transform -translate-y-1/2"
        />

        <p className="max-w-xl text-[#8C8C8C] text-base sm:text-lg px-2 animate-pulse">
          SkillConnect connects verified artisans and clients with safe escrow
          payments, in-app chat, and transparent profiles. Built for trust. Made
          for Nigeria.
        </p>
        <img
          src={dot}
          alt="decorative dot"
          className="absolute top-64 right-56 w-6 h-6 transform -translate-x-1/2"
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <button
     onClick={() => navigate("/")}
    className="bg-[#275DB0] text-white px-6 sm:px-10 py-3 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
    >
    I'm an Artisan - Get Jobs</button>
    <button
    onClick={() => navigate("/")}
    className="border-2 border-[#275DB0] text-[#275DB0] px-6 sm:px-10 py-2 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-200 transition-colors w-full sm:w-auto"
          >
            I'm a Client - Hire now
          </button>
        </div>

        <div className=" relative w-screen overflow-hidden m-0 p-0">
          <div className="clip-wave w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden">
            <div className="animate-scroll flex w-max space-x-4 h-full rounded-b-3xl overflow-hidden">
              {[pic1, pic2, pic3, pic4, pic1, pic2, pic3, pic4].map(
                (pic, idx) => (
                  <img
                    key={idx}
                    src={pic}
                    alt={`pic-${idx}`}
                    className="h-full w-[350px] sm:w-[300px] md:w-[350px] object-cover overflow-hidden rounded-bl-3xl transition-transform duration-300 hover:scale-105"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-18">
        <div className="flex flex-col items-center px-4 mb-18">
          <button className="bg-[#275DB033] text-[#275DB0] text-center font-bold px-4 py-2">
            HOW IT WORKS
          </button>
          <h1 className="bg-gradient-to-r from-[#000000] via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent text-5xl sm:text-4xl md:text-5xl font-semibold mt-6 text-center">
            How SkillConnect Works
          </h1>
        </div>
        <div className="flex flex-col xl:flex-row justify-center mb-24 mt-8 items-stretch px-4 md:px-2 py-2 gap-6 lg:gap-2 max-w-7xl mx-auto">
          {/* For Artisans */}
          <div className="w-full max-w-full h-full md:max-w-[35rem] xl:w-[35rem] mx-auto mt-8 xl:mt-4 text-left border-2 border-[#275DB0] rounded-xl px-4 sm:px-8 py-8 shadow-lg">
            <p className="bg-gradient-to-t from-[#000000] via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-medium my-6">
              For Artisans
            </p>

            {/* Step 1 */}
            <div className="flex items-start gap-3 mb-2 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-[#275DB0] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold my-4 sm:my-6 mx-2 sm:mx-4 text-xs sm:text-sm z-10">
                  01
                </div>
                <div className="absolute top-12 sm:top-16 left-4 sm:left-10 transform -translate-x-1/2 w-1 h-48 sm:h-72 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Create an account as an artisan
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Upload your certificates and portfolio, showcasing your
                    skills. Submit them in the application portal.
                  </p>
                </article>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 mb-2 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold my-6 sm:my-10 mx-2 sm:mx-4 text-xs sm:text-sm z-10">
                  02
                </div>
                <div className="absolute top-16 sm:top-28 left-4 sm:left-10 transform -translate-x-1/2 w-0.5 h-24 sm:h-32 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Apply for jobs and get paid securely
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Discover local jobs and apply directly. Discuss project
                    details with clients, start the work upon acceptance, and
                    receive 70% of the payment after completion.
                  </p>
                </article>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-1 sm:gap-1 mb-8 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold mx-2 sm:mx-4 my-6 sm:my-10 text-xs sm:text-sm z-10">
                  03
                </div>
                <div className="absolute top-4 sm:top-5 left-4 sm:left-10 transform -translate-x-1/2 w-0.5 h-32 sm:h-44 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Get ratings and build profile
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Client feedback after a job is crucial for improving your
                    services and better meeting expectations.
                  </p>
                </article>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="bg-[#275DB0] text-white border-2 border-[#275DB0] px-6 sm:px-8 py-3 ml-1 sm:ml-2 rounded-lg font-medium text-sm sm:text-base md:text-lg hover:bg-blue-700 hover:text-white transition-colors w-full sm:w-auto"
            >
              I'm a Artisan - Get Jobs
            </button>
          </div>

          {/* For Clients */}
          <div className="w-full max-w-full md:max-w-[35rem] xl:w-[35rem] mx-auto xl:mt-24 text-left border-2 border-[#275DB0] rounded-xl px-4 sm:px-8 py-8 shadow-xl">
            <p className="bg-gradient-to-t from-[#000000] via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-medium my-6">
              For Clients
            </p>

            {/* Step 1 */}
            <div className="flex items-start gap-3 mb-2 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold my-4 sm:my-6 mx-2 sm:mx-4 text-xs sm:text-sm z-10">
                  01
                </div>
                <div className="absolute top-12 sm:top-16 left-4 sm:left-10 transform -translate-x-1/2 w-1 h-48 sm:h-72 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Post your job request
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Submit your job request and explore profiles of skilled
                    artisans to find the perfect match for your project!
                  </p>
                </article>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 mb-2 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-blue-600 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold my-6 sm:my-10 mx-2 sm:mx-4 text-xs sm:text-sm z-10">
                  02
                </div>
                <div className="absolute top-16 sm:top-28 left-4 sm:left-10 transform -translate-x-1/2 w-0.5 h-24 sm:h-32 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Fund account and chat with artisan
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Fund 30% upfront through escrow. Communicate with the
                    artisan and track progress. Confirm delivery and release the
                    remaining 70% when satisfied.
                  </p>
                </article>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-1 sm:gap-1 mb-8 relative">
              <div className="relative flex-shrink-0">
                <div className="bg-[#275DB0] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold mx-2 sm:mx-4 my-6 sm:my-10 text-xs sm:text-sm z-10">
                  03
                </div>
                <div className="absolute top-4 sm:top-5 left-4 sm:left-10 transform -translate-x-1/2 w-0.5 h-32 sm:h-44 border-l-2 border-dashed border-[#275DB080]"></div>
              </div>
              <div className="flex-1 min-w-0">
                <article className="py-2 px-2">
                  <h2 className="py-4 sm:py-8 px-2 sm:px-4 font-semibold text-base sm:text-lg md:text-xl">
                    Leave review upon delivery
                  </h2>
                  <p className="px-2 sm:px-4 text-[#8C8C8C] text-sm sm:text-base font-semibold leading-relaxed">
                    Please leave a detailed review of the artisan's work. Your
                    feedback is invaluable for others.
                  </p>
                </article>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="bg-white text-[#275DB0] border-2 border-[#275DB0] px-6 sm:px-8 py-3 ml-1 sm:ml-2 rounded-lg font-medium text-sm sm:text-base md:text-lg hover:bg-blue-700 hover:text-white transition-colors w-full sm:w-auto"
            >
              I'm a Client - Get Hired
            </button>
          </div>
        </div>
      </div>

      <section className="bg-[#275DB033] w-full mt-18 mb-24 h-auto px-4 sm:px-6 md:px-8 py-10">
        <button className="bg-[#275DB033] mb-6 px-6 py-2">WHY US</button>

        <div className="flex flex-col lg:flex-row justify-between gap-8 zoom-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-400 bg-gradient-to-l from-[#000000] via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent">
            Designed for Trust.
            <br /> Powered by Escrow.
          </h1>

          <div className="flex flex-col items-start lg:items-end">
            <button
              onClick={() => navigate("/")}
              className="bg-[#275DB0] text-white px-6 sm:px-8 md:px-10 py-3 m-3 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              I'm an Artisan - Get Jobs
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-white text-[#275DB0] border-2 border-[#275DB0] py-3 px-6 sm:px-8 md:px-10 m-3 rounded-lg font-medium text-base sm:text-lg hover:bg-blue-700 hover:text-white transition-colors w-full sm:w-auto"
            >
              I'm a Client - Get Hired
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center my-11">
          <div className="bg-white h-[250px] sm:h-[291px] w-full max-w-[280px] sm:max-w-[296px] rounded-lg flex flex-col justify-evenly items-start px-6 sm:px-8 hover:shadow-xl transition duration-300">
            <img
              src={vec1}
              alt="c"
              className="w-[40px] sm:w-[49px] h-[40px] sm:h-[49px]"
            />
            <h1 className="text-2xl sm:text-base font-semibold">
              Escrow-secured
              <br /> payments via Paystack
            </h1>
            <p className="text-[#8C8C8C] text-xs sm:text-sm">
              No more paying in
              <br /> blind faith.
            </p>
          </div>

          <div className="bg-white h-[250px] sm:h-[291px] w-full max-w-[280px] sm:max-w-[296px] rounded-lg flex flex-col justify-evenly items-start px-6 sm:px-8 hover:shadow-xl transition duration-300">
            <img
              src={vec2}
              alt="c"
              className="w-[40px] sm:w-[49px] h-[40px] sm:h-[49px]"
            />
            <h1 className="text-2xl sm:text-base font-semibold">
              Verified artisan <br />
              profiles
            </h1>
            <p className="text-[#8C8C8C] text-xs sm:text-sm">
              See uploaded certificates and real experience.
            </p>
          </div>

          <div className="bg-white h-[250px] sm:h-[291px] w-full max-w-[280px] sm:max-w-[296px] rounded-lg flex flex-col justify-evenly items-start px-6 sm:px-8 hover:shadow-2xl transition duration-300">
            <img
              src={vec3}
              alt="c"
              className="w-[40px] sm:w-[49px] h-[40px] sm:h-[49px]"
            />
            <h1 className="text-2xl sm:text-base font-semibold">
              Post-job reviews
              <br />
              and ratings
            </h1>
            <p className="text-[#8C8C8C] text-xs sm:text-sm">
              Only the best rise
              <br /> to the top.
            </p>
          </div>

          <div className="bg-white h-[250px] sm:h-[291px] w-full max-w-[280px] sm:max-w-[296px] rounded-lg flex flex-col justify-evenly items-start px-6 sm:px-8 hover:shadow-xl transition duration-300">
            <img
              src={vec4}
              alt="c"
              className="w-[40px] sm:w-[49px] h-[40px] sm:h-[49px]"
            />
            <h1 className="text-2xl sm:text-base font-semibold">
              In-app messaging <br></br>for every job
            </h1>
            <p className="text-[#8C8C8C] text-xs sm:text-sm">
              Clear expectations.
              <br />
              Fewer issues.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12 flex flex-col items-center justify-between px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Top Content */}
        <div className="flex flex-col gap-6 items-center mt-8 mb-8 text-center w-full max-w-3xl">
          <button className="bg-[#275DB033] text-[#275DB0] px-5 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium">
            OUR LOCATION
          </button>

          <h1 className="font-semibold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug sm:leading-tight bg-gradient-to-l from-black via-[#275DB0] to-[#1E1E1E] bg-clip-text text-transparent">
            Trusted by Artisans across Nigeria.
          </h1>

          <p className="text-[#8C8C8C] text-base sm:text-lg">
            Our pilot network is live in:
          </p>
          <Location />
        </div>

        <img
          src={flag}
          alt="Nigerian Flag"
          className="w-full  h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[490px] mb-16 sm:mb-24 md:mb-10"
        />
      </section>

      <section className="h-auto min-h-[16rem] sm:min-h-[20rem] m-3 sm:m-5 px-12 sm:px-6 bg-[#275DB0] rounded-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 py-8 sm:py-14">
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white font-semibold leading-tight mb-4">
              Ready to Work Smart?
              <br />
              Let's Go
            </h2>
            <p className="text-sm md:text-base text-[#E0EFFF]">
              Join the platform built for real jobs, real trust, and real
              results in Nigeria.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4 w-full md:w-auto">
            <button
              onClick={() => navigate("/")}
              className="bg-white text-[#275DB0] font-medium px-4 sm:px-6 py-3 rounded-md w-full md:w-auto hover:shadow-md transition text-sm sm:text-base"
            >
              I'm an Artisan - Get Jobs
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-white text-white font-medium px-4 sm:px-6 py-3 rounded-md w-full md:w-auto hover:bg-white hover:text-[#275DB0] transition text-sm sm:text-base"
            >
              I'm a Client - Hire Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <button
        onClick={scrollToTop}
        className="fixed bottom-1 right-8 p-3 bg-[#275DB0] text-white rounded-full shadow-lg hover:bg-blue-600 transition-all z-50 animate-bounce"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};
export default LandingPage;
