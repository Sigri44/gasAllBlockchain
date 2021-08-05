// Constants

const URI_ETHEREUM_ETHERSCAN = "https://api.etherscan.io/api?module=gastracker&action=gasoracle";
const URI_ETHEREUM_GASSTATION = "https://ethgasstation.info/api/ethgasAPI.json";
const URI_POLYGON = "https://gasstation-mainnet.matic.network/";
const URI_BSC = "https://bscgas.info/gas";
const URI_XDAI = "https://blockscout.com/xdai/mainnet/api/v1/gas-price-oracle";

updateGasPrice("ethereum1", URI_ETHEREUM_ETHERSCAN);
updateGasPrice("ethereum2", URI_ETHEREUM_GASSTATION);
updateGasPrice("polygon", URI_POLYGON);
updateGasPrice("bsc", URI_BSC);
updateGasPrice("xdai", URI_XDAI);

window.setTimeout(function () {
    window.location.reload();
}, 30000);

function updateGasPrice(network, uri) {
    var request = new XMLHttpRequest();

    request.open('GET', uri);
    request.responseType = 'json';

    request.onload = function() {
        // console.log(typeof request.response, request.response);

        switch (network) {
            case "ethereum1":
                var selectorSafeLow = document.querySelector('#ethereumSafeLow');
                var selectorStandard = document.querySelector('#ethereumStandard');
                var selectorFast = document.querySelector('#ethereumFast');
                var selectorFastest = document.querySelector('#ethereumFastest');

                selectorSafeLow.textContent = request.response.result.SafeGasPrice;
                selectorStandard.textContent = request.response.result.ProposeGasPrice;
                selectorFast.textContent = request.response.result.FastGasPrice;
                selectorFastest.textContent = request.response.result.FastGasPrice;
                break;
            case "ethereum2":
                var selectorSafeLow = document.querySelector('#ethereum2SafeLow');
                var selectorStandard = document.querySelector('#ethereum2Standard');
                var selectorFast = document.querySelector('#ethereum2Fast');
                var selectorFastest = document.querySelector('#ethereum2Fastest');

                selectorSafeLow.textContent = request.response.safeLow /10;
                selectorStandard.textContent = request.response.average /10;
                selectorFast.textContent = request.response.fast /10;
                selectorFastest.textContent = request.response.fastest /10;
                break;
                
            case "polygon":
                var selectorSafeLow = document.querySelector('#polygonSafeLow');
                var selectorStandard = document.querySelector('#polygonStandard');
                var selectorFast = document.querySelector('#polygonFast');
                var selectorFastest = document.querySelector('#polygonFastest');

                selectorSafeLow.textContent = Math.round(request.response.safeLow);
                selectorStandard.textContent = Math.round(request.response.standard);
                selectorFast.textContent = Math.round(request.response.fast);
                selectorFastest.textContent = Math.round(request.response.fastest);
                break;
                
            case "bsc":
                var selectorSafeLow = document.querySelector('#bscSafeLow');
                var selectorStandard = document.querySelector('#bscStandard');
                var selectorFast = document.querySelector('#bscFast');
                var selectorFastest = document.querySelector('#bscFastest');

                selectorSafeLow.textContent = request.response.slow;
                selectorStandard.textContent = request.response.standard;
                selectorFast.textContent = request.response.fast;
                selectorFastest.textContent = request.response.instant;
                break;
                
            case "xdai":
                var selectorSafeLow = document.querySelector('#xdaiSafeLow');
                var selectorStandard = document.querySelector('#xdaiStandard');
                var selectorFast = document.querySelector('#xdaiFast');
                var selectorFastest = document.querySelector('#xdaiFastest');

                selectorSafeLow.textContent = request.response.slow;
                selectorStandard.textContent = request.response.average;
                selectorFast.textContent = request.response.fast;
                selectorFastest.textContent = request.response.fast;
                break;
        
            default:
                break;
        }
    };

    request.send();
}
