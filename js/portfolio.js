// JavaScript for Portfolio Builder Application
// Constants - Data that does not Change

const BASE_URL = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=';
const MONEY_PARAMETER = '&tsyms=USD';
const API_PARAMETER = '&api_key=';
const API_KEY = '&api_key=126a3db639a3dc303efb721f6f93919d579bc1edd1b38726c4c4f01c16933771';
const IMAGE_URL = 'https://www.cryptocompare.com';

// Variables - Data that Changes


// Cached Elements

const $form = $('form');
const $addCoin = $('#crypto-one');
const $quantity = $('#crypto-two');
const $main = $('#main-container');
const $table = $('table');

// Event Listners 

$form.on('submit', handleAdd);

// Functions

function handleAdd (evt) {
    evt.preventDefault();
    const addedCoin = $addCoin.val().toUpperCase();
    const quantity = $quantity.val();
    $.ajax(`${BASE_URL}${addedCoin}${MONEY_PARAMETER}${API_PARAMETER}${API_KEY}`)
        .then(function(data) {
            apiDataCoin = data;
            addedCoinData = apiDataCoin.RAW[`${addedCoin}`].USD;
            addedCoinQuantity = quantity;
            renderTableRow();
            $addCoin.val('');
            $quantity.val('');
        }, function (error) {
            console.log('promise failed');
            console.log(error);
        })
}

function renderTableRow () {
    let valueOf;
    let x;
    x = eval(`${addedCoinData.PRICE}*${addedCoinQuantity}`);
    valueOf = x.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 10});
    $('#introduction').css({
        "visibility":"hidden"
    });
    $('table').css({
        "visibility":"visible"
    });
    $('table > :last-child').append (`
        <tr>
            <td><img src="${IMAGE_URL}${addedCoinData.IMAGEURL}" alt="${addedCoinData.FROMSYMBOL} Logo" width="50px" height="50px"></td>
            <td>${addedCoinData.FROMSYMBOL}</td>
            <td>$${addedCoinData.PRICE.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 10})}</td>
            <td>${addedCoinQuantity}</td>
            <td>$${valueOf}</td>
        </tr>
    `)
}
