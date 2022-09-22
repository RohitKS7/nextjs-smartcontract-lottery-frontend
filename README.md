# Setup

1. Install Nextjs with `yarn create next-app .` (FULLSTOP IS IMPORTANT)

2. Install React-Moralis to build web3 frontend easily.

3. Install "Web3UIKit" = Beautiful and Lightweight UI components for web3 developers. This UI library will speed up your Dapp development no matter which chain you build on.

4. Create Header.jsx

5. Create LotteryEntrance.jsx

6. Go back to contract directory and run local hardhat node chain.

7. Create a new file "update-frontend-deploy" script into deploy folder in hardhat-lottery-smartcontract directory. This script will create constants (abi stuff) folder automatically everytime we update the backend files.

8. Run `yarn build` to build a static site of nextjs version. This site have no way to talk with the backend. Since we are deploying it on IPFS we didn't need the backend.

9. Then run `yarn next export` which will make a folder "out" consisting the static site which we can upload on IPFS.

> Note: Step 9 will fail if any server side stuff is available.

# Uploading Static Site On IPFS

1. Download Desktop IPFS or You can run a node on Brave Browser.
2. Import the "out" folder.
3. CLick "Set Pinning" and apply.
4. Copy CID
5. search `ipfs://copy-cid` or NEXTJS Static site link `ipfs://QmeH7oCUPP3eeCUcQoAqjFjoKeHgcCNrQHFQ5CLZ3Fki5G/`

# Uploading Static Site On IPFS easily with FLEEK

1. Go to fleek.co and signin with github
2. Then Connect your repository like netlify and setup your site.
3. Get the site Link https://rohit-decentralized-lottery.on.fleek.co/
