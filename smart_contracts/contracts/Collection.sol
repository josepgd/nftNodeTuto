// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Collection is ERC721URIStorage, Ownable {

    uint tokenId = 0;

    constructor() ERC721('My Collection', 'MYC') {}

    function mint(string memory uri) public {
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        tokenId++;
    }
}