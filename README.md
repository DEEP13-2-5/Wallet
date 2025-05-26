# 🦊 Web3 Wallet Dashboard

A simple React-based Web3 wallet dashboard that connects to MetaMask, displays wallet address, ETH balance, and network information. Built with `ethers.js` and React Hooks.

## 🚀 Live Deployment

🌐 https://wallet-alpha-ten.vercel.app/

---

## ✅ Core Features

### 🔗 Connect Wallet
- Users can connect their MetaMask wallet via a "Connect Wallet" button.
- The app detects if MetaMask is not installed and displays a user-friendly message.
- On successful connection, the wallet address and Ethereum network name are shown.

### 💰 ETH Balance
- The app fetches and displays the user's ETH balance using `ethers.js`.

### ⚛️ React Features
- Built with **React functional components**.
- Uses **React Hooks** for managing wallet state.
- Dynamically responds to account or network changes using `window.ethereum` event listeners.

---

## 🎁 Bonus Features

- ✅ Fetch and display **DAI token balance** via ERC-20 contract.
- ✅ Show **ENS name** if the connected wallet has one.
- ✅ Implemented **dark/light mode** toggle.
- ✅ Global wallet state is managed using **React Context API**.

---

## 📦 Technologies Used

- [React](https://reactjs.org/)
- [ethers.js](https://docs.ethers.io/)
- [MetaMask](https://metamask.io/)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [Vercel](https://vercel.com/) (for deployment)

---

## 📌 Assumptions

- MetaMask is assumed to be the wallet provider.
- Users will access the app on a desktop browser with MetaMask installed.
- The user is on the Ethereum mainnet or testnets like Goerli.

---

## 🛠️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/web3-wallet-dashboard.git
   cd web3-wallet-dashboard
