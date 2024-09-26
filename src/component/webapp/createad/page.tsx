"use client";
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { BN, web3, Program } from '@project-serum/anchor';

// Define props for the AdForm component
interface AdFormProps {
  program: Program | null;
}

const AdForm: React.FC<AdFormProps> = ({ program }) => {
  const [name, setName] = useState('');
  const [projectUri, setProjectUri] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const wallet = useWallet();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!program || !wallet.publicKey) return;

    try {
      const ad = web3.Keypair.generate();
      await program.methods.createAd(name, projectUri, categories, description, new BN(price))
        .accounts({
          ad: ad.publicKey,
          user: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([ad])
        .rpc();
      alert('Ad created successfully!');
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ad Name"
        className="block mb-2 p-2 border w-full"
      />
      <input
        type="text"
        value={projectUri}
        onChange={(e) => setProjectUri(e.target.value)}
        placeholder="Project URI"
        className="block mb-2 p-2 border w-full"
      />
      <input
        type="text"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        placeholder="Categories"
        className="block mb-2 p-2 border w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="block mb-2 p-2 border w-full"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price (in SOL)"
        className="block mb-2 p-2 border w-full"
      />
      <button type="submit" className="p-2 bg-green-500 text-white">Create Ad</button>
    </form>
  );
};

export default AdForm;