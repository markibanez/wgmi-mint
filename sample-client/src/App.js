import logo from './logo.svg';
import './App.css';

function App() {
    const connectWallet = () => {
        alert('hello')
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
