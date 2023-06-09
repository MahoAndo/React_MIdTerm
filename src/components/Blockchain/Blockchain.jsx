import React, { useState } from 'react'
import Select from "react-select";

import { 
    Container,
    Table,
    Button
} from "reactstrap"

//select options
const options = [
    { value: "0", label: "Select Symbol", img: ""},
    { value: "BTC", label: "BTC", img: "btc" },
    { value: "ETH", label: "ETH", img: "eth" },
    { value: "BCH", label: "BCH", img: "bch" },
    { value: "LTC", label: "LTC", img: "ltc" },
    { value: "DOGE", label: "DOGE", img: "doge" },
    { value: "XRP", label: "XRP", img: "xrp" },
    { value: "XEM", label: "XEM", img: "xem" },
    { value: "XLM", label: "XLM", img: "xlm" },
    { value: "BAT", label: "BAT", img: "bat" },
    { value: "OMG", label: "OMG", img: "omg" },
    { value: "XTZ", label: "XTZ", img: "xtz" },
    { value: "QTUM", label: "QTUM", img: "qtum" },
    { value: "ENJ", label: "ENJ", img: "enj" },
    { value: "DOT", label: "DOT", img: "dot" },
    { value: "ATOM", label: "ATOM", img: "atom" },
    { value: "XYM", label: "XYM", img: "xym" },
    { value: "MONA", label: "MONA", img: "mona" },
    { value: "ADA", label: "ADA", img: "ada" },
    { value: "MKR", label: "MKR", img: "mkr" },
    { value: "DAI", label: "DAI", img: "dai" },
    { value: "LINK", label: "LINK", img: "link" },
    { value: "SOL", label: "SOL", img: "sol" }
];

function Blockchain() {
    const [selectValue, setSelectValue] = useState(options[0]); //select options
    const [dataArray, setDataArray] = useState([]);             //set data from api
    const [checkFlg, setCheckFlg] = useState(false);            //check flg
    const [displayIcon, setDisplayIcon] = useState("");         //display imageIcon
    const symbol = selectValue.value;                           //selected symbol
    const imageIcon = selectValue.img;                          //selected symbol
    let dataTable;                                              // for display

    //-----------------------------------------------------
    //select action
    //-----------------------------------------------------
    const handleChange = selectValue => {
        setSelectValue(selectValue);
    };

    //-----------------------------------------------------
    //fetching data from api with using selected symbol
    //-----------------------------------------------------
    const fetchBlockchain = async() => {
        if(symbol !== "0"){
            await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                }
            ).then((res) => {
                if(res.ok)
                    return res.json();
                else
                    throw new Error();
                }
                ).then((json) => {
                    let info = json.DISPLAY[symbol].USD;
                    setDataArray([
                        symbol,
                        info.LASTUPDATE,    //update time
                        info.PRICE,         //market price
                        info.MKTCAP,        //market cap
                        info.HIGHDAY,       //high price
                        info.LOWDAY,        //low price
                        info.IMAGEURL       //image url
                    ]);
                    setCheckFlg(true);
                    setDisplayIcon(imageIcon);
                });
        }else{
            setCheckFlg(false);
        }
    };
        console.log(checkFlg);
    //-----------------------------------------------------
    //setting display
    //-----------------------------------------------------
    if (checkFlg === false) {
        dataTable = (
            <div className='message'>
                <h1>Select Symbol and Let's Check!</h1>
                <p className="error icon_size"></p>
            </div>     
        );
    }else{
        
        dataTable = (
            <Table>
                <thead>
                    <tr>
                        <th style={{borderBlockWidth: 'inherit'}} key={dataArray[0].toString()}>{dataArray[0]}</th>
                        <div className={`icon_size ${displayIcon}`}></div>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Update Time</th>
                        <th key={dataArray[1].toString()}>{dataArray[1]}</th>
                    </tr>
                    <tr>
                        <th>Market Price</th>
                        <th key={dataArray[2].toString()}>{dataArray[2]}</th>
                    </tr>
                    <tr>
                        <th>Market Cap</th>
                        <th key={dataArray[3].toString()}>{dataArray[3]}</th>
                    </tr>
                    <tr>
                        <th>High Price</th>
                        <th key={dataArray[4].toString()}>{dataArray[4]}</th>
                    </tr>
                    <tr>
                        <th>Low Price</th>
                        <th key={dataArray[5].toString()}>{dataArray[5]}</th>
                    </tr>
                </tbody>
            </Table>
        );
    };


    return(
        <Container>
            <div className='mt-5 inner-container'>
                <Select options={options} value={selectValue} onChange={handleChange} />
                <div className='inner-container-button'>
                    <Button className='mt-3 button' onClick={fetchBlockchain}>Check</Button>
                </div>
            </div>
            <div className='mt-5'>
                {dataTable}
            </div>
        </Container>

    );
};

export default Blockchain;
