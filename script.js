// Constants - Data that does not Change

const BASE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=';
const MONEY_PARAMETER = '&tsyms=USD';
const API_PARAMETER = '&api_key=';
const API_KEY = '&api_key=126a3db639a3dc303efb721f6f93919d579bc1edd1b38726c4c4f01c16933771';
const IMAGE_URL = 'https://www.cryptocompare.com';

// Variables - Data that Changes

let cryptoOneData;
let cryptoTwoData;

// Cached Elements

const $coinInputOne = $('#crypto-one');
const $coinInputTwo = $('#crypto-two');
const $form = $('form');
const $main = $('#main-container');
const $speculate = $("#speculate-button");

// Event Listners 

$form.on('submit', handleSearch);
$('#main-container').on('click','#speculate-button',function() {
   console.log(`${cryptoOneData.MKTCAP}`);
   console.log(`${cryptoTwoData.MKTCAP}`); 
});


// Functions



function handleSearch (evt) {
    evt.preventDefault();
    const cryptoOne = $coinInputOne.val().toUpperCase();
    const cryptoTwo = $coinInputTwo.val().toUpperCase();
    $.ajax(`${BASE_URL}${cryptoOne},${cryptoTwo}${MONEY_PARAMETER}${API_PARAMETER}${API_KEY}`)
        .then(function(data){
            apiData = data;
            cryptoOneData = apiData.RAW[`${cryptoOne}`].USD;
            cryptoTwoData = apiData.RAW[`${cryptoTwo}`].USD;
            render ();
            $coinInputOne.val('');
            $coinInputTwo.val('');
        }, function(error) {
            console.log('promise failed');
            console.log(error);
        });
};

function render () {
    $main.html (`
        <div id="crypto-a">
            <div class="crypto-card-a">
                <div class ="symbol">
                    <img src="${IMAGE_URL}${cryptoOneData.IMAGEURL}" alt="${cryptoOneData.FROMSYMBOL} Logo" width="80px" height="80px">
                    <h3>${cryptoOneData.FROMSYMBOL}</h3>
                    <img src="${IMAGE_URL}${cryptoOneData.IMAGEURL}" alt="${cryptoOneData.FROMSYMBOL} Logo" width="80px" height="80px">
                </div>
                <hr>
                <div class ="price">
                    <h4><strong>Price:</strong> $${cryptoOneData.PRICE.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 10})}</h4>
                    <p><strong>1H Change:</strong><span> ${cryptoOneData.CHANGEPCTHOUR.toFixed(2)}%</span></p>
                    <p><strong>24H Change:</strong><span> ${cryptoOneData.CHANGEPCT24HOUR.toFixed(2)}%</span></p>
                </div>
                <hr>
                <div class ="supply">
                    <p>Supply: ${cryptoOneData.SUPPLY.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
                    <p>Mkt Cap: $${cryptoOneData.MKTCAP.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
                </div>
            </div>
        </div>
        <div id="crypto-b">
            <div class="crypto-card-b">
                <div class ="symbol">
                    <img src="${IMAGE_URL}${cryptoTwoData.IMAGEURL}" alt="${cryptoTwoData.FROMSYMBOL} Logo" width="80px" height="80px">
                    <h3>${cryptoTwoData.FROMSYMBOL}</h3>
                    <img src="${IMAGE_URL}${cryptoTwoData.IMAGEURL}" alt="${cryptoTwoData.FROMSYMBOL} Logo" width="80px" height="80px">
                </div>
                <hr>
                <div class ="price">
                    <h4><strong>Price:</strong> $${cryptoTwoData.PRICE.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 10})}</h4>
                    <p><strong>1H Change:</strong><span> ${cryptoTwoData.CHANGEPCTHOUR.toFixed(2)}%</span></p>
                    <p><strong>24H Change:</strong><span> ${cryptoTwoData.CHANGEPCT24HOUR.toFixed(2)}%</span></p>
                </div>
                <hr>
                <div class ="supply">
                    <p>Supply: ${cryptoTwoData.SUPPLY.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
                    <p>Mkt Cap: $${cryptoTwoData.MKTCAP.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
                </div>
            </div>
        </div>
        <div id="speculate">
            <input id="speculate-button" type="button" value="LET'S SPECULATE">
        </div>
    `);
}

// cryptoTwoData.IMAGEURL
// cryptoTwoData.FROMSYMBOL
// cryptoTwoData.PRICE
// cryptoTwoData.CHANGEPCTHOUR
// cryptoTwoData.CHANGEPCT24HOUR
// cryptoTwoData.SUPPLY
// cryptoTwoData.MKTCAP
