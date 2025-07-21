const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            
            {/* Animated background elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full animate-float opacity-30"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
            
            <div className="flex flex-col items-center justify-center min-h-[80vh] relative z-10 animate-fade-in-up">
                <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
                        <span className="text-6xl text-white">404</span>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                        Oops!
                    </h1>
                    <p className="text-2xl text-gray-600 mb-8">Page not found</p>
                    <p className="text-gray-500 mb-8 max-w-md">
                        The page you're looking for doesn't exist or has been moved to a different location.
                    </p>
                    <button 
                        onClick={() => window.history.back()}
                        className="btn-primary"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export { NotFoundPage };
