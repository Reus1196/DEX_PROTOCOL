const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer, network) {
    let weth;
    const FACTORY_ADDRESS = '0xf190D1D9c704932681c0449d219836413a644a31'

    if (network === 'mainnet') {
        weth = await WETH.at('0xBEea042e616471a696e782317fe2CA3515b7F77D');
    } else {
        await deployer.deploy(WETH);
        weth = await WETH.deployed();
    }

    await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
};