const Logo = () => {
return (
    
      <div className="w-full md:w-[35%] bg-[#275DB0] text-white flex flex-col justify-space between items-left p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Logo */}
        <div className="mb-16 relative z-10">
          <h1 className=" text-3xl text-white font-bold tracking-wider align-left">
            SkillConnect
          </h1>
        </div>

        {/* Main Content */}
        <div className="text-left max-w-md relative z-10 space-y-4 my-16">
          <h2 className="text-4xl font-bold mb-6 ">
            Built for <span className="italic font-light">Trust</span>,<br />
            Designed for <span className="italic font-light">Results</span>.
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Connect with trusted clients, showcase your talent, and get paid
            with ease.
          </p>
        </div>
      </div>
      );
      }
      export default Logo;