import { Link } from "react-router-dom";

const HomePage = () => {
  return (
   

    <div className="min-h-screen relative overflow-hidden">
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full animate-float opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-200 rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full animate-float opacity-20" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow overflow-hidden">
            <img 
              src="/logo.jpg" 
              alt="EventVault Logo" 
              className="h-16 w-16 object-cover rounded-full"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to EventVault
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive event management platform for college events. 
            Organize, participate, and manage events all in one place with our intuitive interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Link to="/create-event" className="group">
            <div className="card p-8 text-center hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Event</h3>
              <p className="text-gray-600">Organize and host amazing events with our easy-to-use creation tools.</p>
            </div>
          </Link>
          
          <Link to="/register-participant" className="group">
            <div className="card p-8 text-center hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Events</h3>
              <p className="text-gray-600">Discover and register for exciting events happening around campus.</p>
            </div>
          </Link>
          
          <Link to="/admin" className="group">
            <div className="card p-8 text-center hover-lift group-hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Panel</h3>
              <p className="text-gray-600">Manage events, users, and system settings with powerful admin tools.</p>
            </div>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Events Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">1000+</div>
            <div className="text-gray-600">Active Participants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Organizations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
