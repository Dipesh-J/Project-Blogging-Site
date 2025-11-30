import { Link } from 'react-router-dom';
import { FiArrowRight, FiEdit, FiUsers, FiBookOpen } from 'react-icons/fi';
import { Button, Card } from '../components';
import { useAuthStore } from '../store';

/**
 * Home page with hero section and features
 */
const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: FiEdit,
      title: 'Write & Share',
      description: 'Create beautiful blog posts and share your thoughts with the world.',
    },
    {
      icon: FiUsers,
      title: 'Connect',
      description: 'Connect with other writers and readers in our community.',
    },
    {
      icon: FiBookOpen,
      title: 'Discover',
      description: 'Explore blogs across various categories and topics.',
    },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#282A3A] via-black to-[#282A3A] opacity-50" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#735F32]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C69749]/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
              Share Your Stories with the{' '}
              <span className="text-[#C69749]">World</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[rgba(255,255,255,0.6)] mb-10 max-w-2xl mx-auto">
              A modern blogging platform where writers can express their ideas
              and readers can discover amazing content across various topics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/blogs/create">
                    <Button size="lg">
                      Start Writing
                      <FiArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/blogs">
                    <Button variant="outline" size="lg">
                      Browse Blogs
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg">
                      Get Started
                      <FiArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/blogs">
                    <Button variant="outline" size="lg">
                      Explore Blogs
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#282A3A]/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Why Choose <span className="text-[#C69749]">BlogSite</span>?
            </h2>
            <p className="text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">
              Everything you need to start your blogging journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="outlined"
                hover
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#735F32]/20">
                  <feature.icon className="w-8 h-8 text-[#C69749]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.6)]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <Card className="bg-gradient-to-r from-[#735F32] to-[#C69749] p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of writers sharing their stories. Create your
              account today and start publishing.
            </p>
            {!isAuthenticated && (
              <Link to="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[#735F32] hover:bg-gray-100"
                >
                  Create Free Account
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/blogs/create">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[#735F32] hover:bg-gray-100"
                >
                  Write Your First Post
                </Button>
              </Link>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
