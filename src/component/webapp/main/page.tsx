"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Program } from "@project-serum/anchor";
import { getProgram } from "../../web3/connection"; // Ensure this function works in Vite
import ProfileForm from "../createprofile/page";
import AdList from "../adlist/page";
import AdForm from "../createad/page";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const wallet = useWallet();
  const [program, setProgram] = useState<Program | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Get the program when the wallet is connected
  useEffect(() => {
    const loadProgram = async () => {
      if (wallet.connected) {
        const prog = await getProgram(wallet); // Make sure getProgram is async
        setProgram(prog);
      } else {
        setProgram(null);
        setHasProfile(false);
      }
    };

    loadProgram(); // Call the async function to load the program
  }, [wallet.connected]);

  const handleCreateAdClick = () => {
    if (hasProfile) {
      setShowModal(true);
    } else {
      alert("Please create a profile first to post an ad.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">SolanaMarket</h1>
            <nav className="hidden md:flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />


              <Link to="/profile">
                <FaUser className="text-gray-600 text-xl cursor-pointer" />
              </Link>


              <button
                onClick={handleCreateAdClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Ad
              </button>
            </div>
            <WalletMultiButton className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" />
            <button onClick={toggleMenu} className="md:hidden text-gray-600">
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link to="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </nav>
            <div className="mt-4 space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex space-x-4">
                <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />
                <Link to="/component/webapp/profile">
                  <FaUser className="text-gray-600 text-xl cursor-pointer" />
                </Link>
              </div>
              <button
                onClick={handleCreateAdClick}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Ad
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Main Content */}
      <div className="p-4">
        {wallet.connected ? (
          <>
            {program ? (
              <>
                {!hasProfile ? (
                  <div className="max-w-md mx-auto">
                    <p className="text-center text-black">
                      Please create a profile to access the ad listings and post ads.
                    </p>
                    <ProfileForm program={program} setHasProfile={setHasProfile} />
                  </div>
                ) : (
                  <>
                    <AdList program={program} />
                  </>
                )}
              </>
            ) : (
              <p className="text-center text-black">Loading program...</p>
            )}
          </>
        ) : (
          <p className="text-center text-black">Please connect your wallet to use the app.</p>
        )}
      </div>

      {/* Modal for Creating Ads */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl text-black font-bold mb-4">Create New Ad</h2>
            <AdForm program={program} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
