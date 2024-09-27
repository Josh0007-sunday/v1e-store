import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Users, Coffee, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import front from "../component/images/front.png"

const MarketPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeClass = isDarkTheme
    ? 'bg-gradient-to-br from-purple-900 to-indigo-900 text-white'
    : 'bg-gradient-to-br from-purple-100 to-indigo-100 text-gray-800';

  const companies = [
    'Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F'
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${themeClass}`}>
      <header className="fixed w-full z-10 bg-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-50">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            SolanaMarket
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-4"
          >
            <a href="#features" className="hover:text-purple-300 transition-colors">Features</a>
            <a href="#community" className="hover:text-purple-300 transition-colors">Community</a>
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
          </motion.div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-opacity-20 bg-purple-500"
            >
              {isDarkTheme ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors"
            >
              <Link  to="/home">
                Launch dApp
              </Link>
             
            </motion.button>
          </div>
        </nav>
      </header>

      <main>
        <section className="h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Decentralized Commerce</h1>
            <p className="text-xl md:text-2xl mb-8">Trade freely on the Solana blockchain</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg transition-colors"
              onClick={() => alert('Launching dApp...')}
            >
              Start Trading
            </motion.button>
          </motion.div>
          <motion.div
            style={{
              y: scrollY * 0.5,
              rotate: scrollY * 0.02,
            }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <ShoppingBag size={120} className="text-purple-300 opacity-20" />
          </motion.div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Choose SolanaMarket?</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <Zap size={48} />, title: 'Lightning Fast', description: 'Experience the speed of Solana' },
                { icon: <Users size={48} />, title: 'P2P Trading', description: 'Direct transactions between users' },
                { icon: <Coffee size={48} />, title: 'User-Friendly', description: 'Intuitive interface for all levels' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-800 bg-opacity-50 p-6 rounded-lg text-center"
                >
                  <div className="text-purple-300 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-opacity-50 bg-purple-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Trusted by Industry Leaders</h2>
            <div className="flex overflow-x-hidden">
              <motion.div
                className="flex space-x-12"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {companies.concat(companies).map((company, index) => (
                  <div key={index} className="flex items-center justify-center w-48 h-24 bg-white bg-opacity-10 rounded-lg">
                    <span className="text-xl font-semibold">{company}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-4xl font-bold mb-6">About Us</h2>
                <p className="text-lg mb-4">
                  SolanaMarket is revolutionizing e-commerce through the power of blockchain technology. Our platform enables seamless peer-to-peer transactions, empowering both buyers and sellers in a decentralized marketplace.
                </p>
                <p className="text-lg">
                  Built on the Solana blockchain, we offer lightning-fast transactions, low fees, and a user-friendly interface that makes crypto-commerce accessible to everyone.
                </p>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg overflow-hidden shadow-2xl"
                >
                  <img src={front} alt="About SolanaMarket" className="w-full h-auto" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="community" className="py-20 bg-indigo-900 bg-opacity-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
            <p className="text-xl mb-12">Connect with traders and creators from around the world</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
              >
                Discord
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors"
              >
                Twitter
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 SolanaMarket. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MarketPage;