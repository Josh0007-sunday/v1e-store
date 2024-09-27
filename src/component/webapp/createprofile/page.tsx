// "use client";
// import { useState, useEffect } from "react";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Program, web3 } from "@project-serum/anchor";
// import { PublicKey } from "@solana/web3.js";

// interface CreateProfileProps {
//   program: Program | null;
//   setHasProfile: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ProfileForm: React.FC<CreateProfileProps> = ({
//   program,
//   setHasProfile,
// }) => {
//   const [name, setName] = useState("");
//   const [telegramUrl, setTelegramUrl] = useState("");
//   const wallet = useWallet();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const checkProfile = async () => {
//       if (!program || !wallet.publicKey) return;

//       try {
//         const [profilePDA] = await PublicKey.findProgramAddress(
//           [Buffer.from("user-profile"), wallet.publicKey.toBuffer()],
//           program.programId
//         );
//         const profile = await program.account.userProfile.fetch(profilePDA);
//         if (profile) {
//           setHasProfile(true); // User has a profile
//         }
//       } catch (error) {
//         console.log("Profile not found:", error);
//         setHasProfile(false); // User does not have a profile
//       }
//     };

//     checkProfile();
//   }, [program, wallet.publicKey, setHasProfile]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!program || !wallet.publicKey) return;
//     setLoading(true); // Set loading to true
//     try {
//       const [profilePDA] = await PublicKey.findProgramAddress(
//         [Buffer.from("user-profile"), wallet.publicKey.toBuffer()],
//         program.programId
//       );
//       console.log("Creating profile at PDA:", profilePDA.toString());
//       console.log("Name:", name);
//       console.log("Telegram URL:", telegramUrl);

//       await program.methods
//         .createProfile(name, telegramUrl)
//         .accounts({
//           profile: profilePDA,
//           user: wallet.publicKey,
//           systemProgram: web3.SystemProgram.programId,
//         })
//         .rpc();

//       alert("Profile created successfully!");
//       setHasProfile(true);
//     } catch (error) {
//       console.error("Error creating profile:", error);
//     } finally {
//       setLoading(false); // Set loading to false
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen px-2 sm:px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-2 sm:p-6 border border-white rounded-lg max-w-sm w-full space-y-4"
//       >
//         <h2 className="text-white text-xl font-semibold text-center">
//           Create Profile
//         </h2>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="p-2 w-full border rounded-md bg-gray-700 text-white"
//         />
//         <input
//           type="text"
//           value={telegramUrl}
//           onChange={(e) => setTelegramUrl(e.target.value)}
//           placeholder="Telegram URL"
//           className="p-2 w-full border rounded-md bg-gray-700 text-white"
//         />
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-500 text-white rounded-md"
//           disabled={loading}
//         >
//           {loading ? "Creating Profile..." : "Create Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;


"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Program, web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

interface CreateProfileProps {
  program: Program | null;
  setHasProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileForm: React.FC<CreateProfileProps> = ({
  program,
  setHasProfile,
}) => {
  const [name, setName] = useState("");
  const [telegramUrl, setTelegramUrl] = useState("");
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (!program || !wallet.publicKey) return;

      try {
        const [profilePDA] = await PublicKey.findProgramAddress(
          [new TextEncoder().encode("user-profile"), wallet.publicKey.toBuffer()],
          program.programId
        );
        const profile = await program.account.userProfile.fetch(profilePDA);
        if (profile) {
          setHasProfile(true); // User has a profile
        }
      } catch (error) {
        console.log("Profile not found:", error);
        setHasProfile(false); // User does not have a profile
      }
    };

    checkProfile();
  }, [program, wallet.publicKey, setHasProfile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!program || !wallet.publicKey) return;
    setLoading(true);
    try {
      const [profilePDA] = await PublicKey.findProgramAddress(
        [new TextEncoder().encode("user-profile"), wallet.publicKey.toBuffer()],
        program.programId
      );
      console.log("Creating profile at PDA:", profilePDA.toString());
      console.log("Name:", name);
      console.log("Telegram URL:", telegramUrl);

      await program.methods
        .createProfile(name, telegramUrl)
        .accounts({
          profile: profilePDA,
          user: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      alert("Profile created successfully!");
      setHasProfile(true);
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-2 sm:p-6 border border-white rounded-lg max-w-sm w-full space-y-4"
      >
        <h2 className="text-white text-xl font-semibold text-center">
          Create Profile
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="p-2 w-full border rounded-md bg-gray-700 text-white"
        />
        <input
          type="text"
          value={telegramUrl}
          onChange={(e) => setTelegramUrl(e.target.value)}
          placeholder="Telegram URL"
          className="p-2 w-full border rounded-md bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;