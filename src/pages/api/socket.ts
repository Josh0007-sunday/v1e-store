// import express from 'express';
// import { Connection, Keypair, PublicKey } from '@solana/web3.js';
// import { encodeURL, findReference, validateTransfer } from '@solana/pay';
// import BigNumber from 'bignumber.js';

// const app = express();
// const port = 3000;

// app.use(express.json()); // To parse incoming JSON payloads

// // USDC Mint address on Devnet
// const USDC_MINT_PUBLIC_KEY = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

// const paymentRequests = new Map();

// // Function to generate the Solana Pay URL
// async function generateUrl(
//   recipient: PublicKey,
//   amount: BigNumber,
//   reference: PublicKey,
//   label: string,
//   message: string,
//   memo: string
// ) {
//   try {
//     const url = encodeURL({
//       recipient,
//       amount,
//       reference,
//       label,
//       message,
//       memo,
//     });
//     return { url };
//   } catch (error) {
//     console.error('Error in generateUrl:', error);
//     throw new Error(`Failed to generate URL: ${(error as Error).message}`);
//   }
// }

// // Function to verify transaction
// async function verifyTransaction(reference: PublicKey) {
//   const paymentData = paymentRequests.get(reference.toBase58());
//   if (!paymentData) {
//     throw new Error('Payment request not found');
//   }
//   const { recipient, amount, memo } = paymentData;
//   const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
//   try {
//     const found = await findReference(connection, reference);
//     const response = await validateTransfer(
//       connection,
//       found.signature,
//       {
//         recipient,
//         amount,
//         splToken: USDC_MINT_PUBLIC_KEY,
//         reference,
//         memo,
//       },
//       { commitment: 'confirmed' }
//     );
//     if (response) {
//       paymentRequests.delete(reference.toBase58());
//     }
//     return response;
//   } catch (error) {
//     console.error('Error in verifyTransaction:', error);
//     throw new Error(`Failed to verify transaction: ${(error as Error).message}`);
//   }
// }

// // POST request handler to generate payment URL
// app.post('/api/payment', async (req, res) => {
//   try {
//     const { recipient, amount } = req.body;

//     if (!recipient || !amount) {
//       return res.status(400).json({ error: 'Missing recipient or amount' });
//     }

//     const recipientPublicKey = new PublicKey(recipient);
//     const amountBigNumber = new BigNumber(amount);
//     const reference = new Keypair().publicKey;
//     const message = `QuickNode Demo - Order ID #0${Math.floor(Math.random() * 999999) + 1}`;

//     const urlData = await generateUrl(
//       recipientPublicKey,
//       amountBigNumber,
//       reference,
//       'QuickNode Guide Store',
//       message,
//       'QN Solana Pay Demo Public Memo'
//     );

//     const ref = reference.toBase58();
//     paymentRequests.set(ref, { recipient: recipientPublicKey, amount: amountBigNumber, memo: 'QN Solana Pay Demo Public Memo' });

//     const { url } = urlData;
//     res.status(200).json({ url: url.toString(), ref });
//   } catch (error) {
//     console.error('Error in POST handler:', error);
//     res.status(500).json({ error: `Internal Server Error: ${(error as Error).message}` });
//   }
// });

// // GET request handler to verify payment
// app.get('/api/verify', async (req, res) => {
//   const { reference } = req.query;
//   if (!reference) {
//     return res.status(400).json({ error: 'Missing reference query parameter' });
//   }

//   try {
//     const referencePublicKey = new PublicKey(reference as string);
//     const response = await verifyTransaction(referencePublicKey);
//     if (response) {
//       res.status(200).json({ status: 'verified' });
//     } else {
//       res.status(404).json({ status: 'not found' });
//     }
//   } catch (error) {
//     console.error('Error in GET handler:', error);
//     res.status(500).json({ error: `Internal Server Error: ${(error as Error).message}` });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
