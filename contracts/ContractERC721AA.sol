// SPDX-License-Identifier: MIT
// Creator: Chiru Labs

pragma solidity ^0.8.4;

import "./ERC721AA.sol";

contract ContractERC721AA is ERC721AA {
  constructor(string memory name_, string memory symbol_)
    ERC721AA(name_, symbol_)
  {}

  function exists(uint256 tokenId) public view returns (bool) {
    return _exists(tokenId);
  }

  function safeMint(address to, uint256 quantity) public {
    _safeMint(to, quantity);
  }
}
