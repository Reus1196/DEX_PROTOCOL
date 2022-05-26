const Factory = artifacts.require("UniswapV2Factory.sol");
const Token1 = artifacts.require("Token1.sol");
const Token2 = artifacts.require("Token2.sol");

module.exports = async function (deployer, network, addresses) {
    await deployer.deploy(Factory, addresses[0]);
    const factory = await Factory.deployed();

    let token1Addres, token2Addres;
    if (network === 'mainnet') {
        token1Addres = '';
        token2Addres = '';
    } else {
        await deployer.deploy(Token1);
        await deployer.deploy(Token2);
        const token1 = await Token1.deployed();
        const token2 = await Token2.deployed();
        token1Addres = token1.address;
        token2Addres = token2.address;
    }
    await factory.createPair(token1Addres, token2Addres);
};