import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';

const app = express();
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const alchemy = new ethers.providers.AlchemyProvider(1, process.env.ALCHEMY_API_KEY);
app.get('/whitelist-me', async (req, res) => {
    const { address, message, signature } = req.query;
    console.log(address, message, signature);
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    const validSignature = address !== recoveredAddress;

    const erc721Abi = ['function balanceOf(address) view returns (uint)'];

    const mmc = new ethers.Contract('0xB2E4e69527D57FA108c535721C057075a7a82E86', erc721Abi, alchemy);
    const mmcBalance = await mmc.balanceOf(address);

    res.send({ recoveredAddress, validSignature, mmcBalance });
})

app.listen(process.env.PORT, () => {
    console.log(`WGMI Whitelist Verification listening on port ${process.env.PORT} on ${process.env.ENVIRONMENT}`);
});
