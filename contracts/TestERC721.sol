// SPDX-License-Identifier: MIT
// Creator: Xing @nelsonie

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';


contract TestERC721 is ERC721 {
  using Strings for uint256;

  constructor() ERC721("ERC721", "ERC721") {
  }
  uint256 private tokenId;

  function mintTest(uint amount) external {
    for (uint256 _tokenId = tokenId; _tokenId < tokenId + amount; _tokenId++) {
      _safeMint(msg.sender, _tokenId);
    }
    tokenId += amount;
  }
}
