import React from 'react';

const ConnectingLines =()=> {
 return(
    <div>
  
  <div className="relative">
  {/* Step 1 */}
  <div className="flex items-start gap-4 mb-16 relative">
    <div className="relative">
      <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm z-10">
        01
      </div>
      {/* Dashed Connecting Line */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-64 border-l-2 border-dashed py-6 border-gray-300"></div>
    </div>
    <div className="flex-1">
      {/* Step 1 content */}
    </div>
    
  </div>

  {/* Step 2 */}
  <div className="flex items-start gap-4 mb-16 relative">
    <div className="relative">
      <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm z-10">
        02
      </div>
      {/* Dashed Connecting Line */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-0.5 h-24 border-l-2 border-dashed border-gray-300 py-6"></div>
    </div>
    <div className="flex-1">
      {/* Step 2 content */}
    </div>
  </div>

  {/* Step 3 */}
  <div className="flex items-start gap-4 relative">
    <div className="relative">
      <div className="bg-blue-600 text-white w-10 h-18 rounded-lg flex items-center justify-center font-bold text-sm z-10">
        03
      </div>
    </div>
    <div className="flex-1">
      {/* Step 3 content */}
    </div>
  </div>
</div>

</div>
 );
}
export default ConnectingLines;