import fetch from 'node-fetch';
const DEXSCREENER_URL = 'https://api.dexscreener.com/latest/dex/search?q=';


const QUERY_LIST = ['WBNB', 'WBTC', 'WETH', 'USDT', 'USDC', 'BUSD'];

main();

function main(){

    for(let symbol of QUERY_LIST)
        fetchFromDex(symbol);
}


async function fetchFromDex(symbol){
    let url = DEXSCREENER_URL + symbol;
    let data = '';

    try{
        let response = await fetch(url);
        data = await response.json()
    }
    catch(error){
        console.log(error);
    };
    data = data['pairs']


    for(let i = 0; i < data.length; i++){
        if(Number(data[i]['liquidity']['usd']) < 1000000)
            console.log(`${data[i]['dexId']} ${data[i]['chainId']} : ${data[i]['baseToken']['symbol']} / ${data[i]['quoteToken']['symbol']} : ${data[i]['priceUsd']} | ${data[i]['priceChange']['m5']}%`);
    }
}