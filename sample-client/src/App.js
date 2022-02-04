import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

function App() {
    const apiBaseUri = 'http://localhost:7000';
    const connectWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, 1);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const message = 'Verifying for WGMI';
        const signature = await signer.signMessage(message);

        const response = await fetch(`${apiBaseUri}/whitelist-me?address=${address}&message=${message}&signature=${signature}`);
        const json = await response.json();
        console.log(json);
    }

    return (
        <div className="App">
            <div className="App-header">
                <button onClick={connectWallet}>Connect Wallet</button>
            </div>
        </div>
    );
}

export default App;
