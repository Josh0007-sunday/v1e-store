"use client";

import { useState, useEffect } from 'react';
import { web3, Program, BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Link } from 'react-router-dom';
// import saga from "../../images/saga.jpg";
import Chat from "../chat/page";
import { FaComments } from "react-icons/fa";

interface AdAccount {
    owner: PublicKey;
    name: string;
    projectUri: string;
    categories: string;
    description: string;
    price: BN;
}

interface ProgramAdAccount {
    publicKey: PublicKey;
    account: AdAccount;
}

interface AdListProps {
    program: Program | null;
}

const AdList: React.FC<AdListProps> = ({ program }) => {
    const [ads, setAds] = useState<ProgramAdAccount[]>([]);
    const [selectedAd, setSelectedAd] = useState<ProgramAdAccount | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchAds = async () => {
            if (!program) return;
            try {
                const fetchedAds = await program.account.ad.all();
                setAds(fetchedAds as unknown as ProgramAdAccount[]);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchAds();
    }, [program]);

    const handleChatClick = (ad: ProgramAdAccount) => {
        setSelectedAd(ad);
        document.getElementById("chat-section")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleCloseChat = () => {
        setSelectedAd(null);
    };

    const formatUSDC = (amount: BN) => {
        return (amount.toNumber() / 1000000).toFixed(2);
    };

    const categories = ["All", "Technology", "Food", "Pets", "Fashion", "Home", "Travel"];

    const filteredAds = selectedCategory && selectedCategory !== "All"
        ? ads.filter(ad => ad.account.categories.includes(selectedCategory))
        : ads;

    return (
        <div className="bg-white min-h-screen">
            {/* Main Content */}
            <div className="container mx-auto pt-20 px-4">
                {/* Categories */}
                <div className="mb-8 overflow-x-auto whitespace-nowrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 mr-2 rounded-full text-sm font-medium ${selectedCategory === category
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAds.length > 0 ? (
                        filteredAds.map((ad) => (
                            <div
                                key={ad.publicKey.toString()}
                                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative h-48 bg-gray-200">
                                    <img
                                        src={ad.account.projectUri}
                                        alt={ad.account.name}
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{ad.account.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{ad.account.description}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-blue-500 font-bold">${formatUSDC(ad.account.price)} USDC</p>
                                        <button
                                            onClick={() => handleChatClick(ad)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FaComments size={20} />
                                        </button>
                                    </div>
                                    <Link
                                        to={`/component/webapp/solanapay?adId=${ad.publicKey.toString()}&price=${ad.account.price.toString()}&seller=${ad.account.owner.toString()}&name=${ad.account.name}&description=${ad.account.description}&categories=${ad.account.categories}`}
                                    >
                                        <p className="mt-4 block w-full text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
                                            Solana Pay
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No advertisements found.</p>
                    )}
                </div>
            </div>

            {/* Chat Component */}
            {selectedAd && program && program.provider.publicKey && (
                <div
                    id="chat-section"
                    className="fixed bottom-0 right-0 w-full md:w-1/3 h-1/2 md:h-2/3 bg-white shadow-lg border border-gray-300 p-4 rounded-t-lg z-20"
                >
                    <Chat
                        adId={selectedAd.publicKey.toString()}
                        buyer={program.provider.publicKey}
                        seller={selectedAd.account.owner}
                        currentUser={program.provider.publicKey}
                        onClose={handleCloseChat}
                    />
                </div>
            )}
        </div>
    );
};

export default AdList;
