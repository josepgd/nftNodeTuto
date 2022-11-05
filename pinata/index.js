const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const pinata =  pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);


// pinata.testAuthentication().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// });

const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./images/NFT.jpeg');


//Image metadata for pinata
const options = {
    pinataMetadata: {
        name: 'TEST NFT COLLECTION',
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};



//pin for Image
const pinFileToIPFS = () => {
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}


//pin for JSON
const pinJSONToIPFS = (body) => {
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}




const getMetaData = async () => {
    const imageUrl = await pinFileToIPFS();
    fs.writeFile('pinataAdresses.txt', `IMAGE_URL = ${imageUrl}\n`, function (err) {
        if (err) throw err;
        console.log(imageUrl);
    });
    
    const body = {
        name: "NFT image",
        message: 'WOW',
        image: imageUrl
    };

    const metadata = await pinJSONToIPFS(body);
    fs.open('pinataAdresses.txt', 'a', 666, function( e, id ) {
    fs.write( id, `JSON_URL = ${metadata} \n`, null, 'utf8', function(){
        fs.close(id, function(){
            console.log(metadata)
        });
    });
  });
    
}

getMetaData();

