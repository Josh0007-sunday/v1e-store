import React, { useState, useEffect } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../../web3/connection'; // Adjust the import path as needed

// Define types for profile and ads
type Profile = {
  name: string;
  telegramUrl: string;
};

type Ad = {
  publicKey: string;
  name: string;
  projectUri: string;
  categories: string;
  description: string;
  price: string;
};

const ProfileDashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ads, setAds] = useState<Ad[]>([]);
  // const [balance, setBalance] = useState({ analytics: 200, wallet: 100 }); 

  const wallet = useAnchorWallet();
  const walletContext = useWallet(); // Gets WalletContextState
  
  const [ setProgram] = useState<any>(null);

  useEffect(() => {
    const initializeProgram = async () => {
      if (wallet && walletContext) {
        const programInstance = getProgram(walletContext); 
        setProgram(programInstance);
        if (programInstance) {
          await fetchProfile(programInstance);
          await fetchAds(programInstance);
        }
      }
    };

    initializeProgram();
  }, [wallet, walletContext]);

  const fetchProfile = async (programInstance: any) => {
    if (!programInstance || !wallet) return;
    try {
      const [profilePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('profile'), wallet.publicKey.toBuffer()],
        programInstance.programId
      );
      const profileAccount = await programInstance.account.userProfile.fetch(profilePda);
      setProfile({
        name: profileAccount.name,
        telegramUrl: profileAccount.telegramUrl,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchAds = async (programInstance: any) => {
    if (!programInstance || !wallet) return;
    try {
      const accounts = await programInstance.account.ad.all([
        {
          memcmp: {
            offset: 8, // Assuming the first 8 bytes are for the account discriminator
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ]);
      setAds(
        accounts.map((account: any) => ({
          publicKey: account.publicKey.toString(),
          name: account.account.name,
          projectUri: account.account.projectUri,
          categories: account.account.categories,
          description: account.account.description,
          price: account.account.price.toString(),
        }))
      );
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="font-medium">{profile?.name || 'Unknown'}</p>
              <a href={profile?.telegramUrl} className="text-blue-500 hover:underline">
                {profile?.telegramUrl || 'No Telegram URL'}
              </a>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Balance</h2>
          <div className="space-y-2">
            <p>Analytics Income: $200</p>
            <p>Wallet Balance: $100</p>
          </div>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Ads</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Project URI</th>
                <th className="py-2 px-4 text-left">Categories</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Price (USDC)</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.publicKey} className="border-b">
                  <td className="py-2 px-4">{ad.name}</td>
                  <td className="py-2 px-4">{ad.projectUri}</td>
                  <td className="py-2 px-4">{ad.categories}</td>
                  <td className="py-2 px-4">{ad.description}</td>
                  <td className="py-2 px-4">{(parseFloat(ad.price) / 1000000).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
