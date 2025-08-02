import twitter from "@/assets/image/twitter.jpeg";
import linkedin from "@/assets/image/linkedin.jpeg";
import github from "@/assets/image/github.jpeg";

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer className="px-6 md:px-16 py-10 mt-8 flex flex-col md:flex-row justify-between gap-10 text-[#1E1E1E] text-sm">
        {/* Left - Brand */}
        <div>
          <h3 className="text-xl font-bold text-[#275DB0] mb-2">
            SkillConnect
          </h3>
          <p className="max-w-xs text-md font-semibold">
            Get real jobs. Hire skilled<br></br> Artisans. Pay and get paid
            <br></br> securely.
          </p>
        </div>

        {/* Right - Links and Socials */}
        <div className="flex flex-col md:flex-row gap-28">
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="font-semibold mb-2">Socials</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-[#275DB033] p-6 rounded-full hover:shadow-md"
              >
                <img src={twitter} alt="t" className=" text-[#275DB0]" />
              </a>
              <a
                href="#"
                className="bg-[#275DB033] p-6 rounded-full hover:shadow-md"
              >
                <img src={linkedin} alt="t" className="text-[#275DB0]" />
              </a>
              <a
                href="#"
                className="bg-[#275DB033] p-6 rounded-full hover:shadow-md"
              >
                <img src={github} alt="t" className="text-[#275DB0]" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="text-md text-[#8C8C8C] m-12 md:mt-0">
        &copy; SkillConnect 2025. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
