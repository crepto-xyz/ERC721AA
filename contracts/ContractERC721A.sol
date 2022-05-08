// SPDX-License-Identifier: MIT
// Creator: Chiru Labs

pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "erc721a/contracts/extensions/ERC721ABurnable.sol";

contract ContractERC721A is ERC721A, ERC721ABurnable {
  constructor(string memory name_, string memory symbol_)
    ERC721A(name_, symbol_)
  {}

  function exists(uint256 tokenId) public view returns (bool) {
    return _exists(tokenId);
  }

  function safeMint(address to, uint256 quantity) public {
    _safeMint(to, quantity);
  }

  function getOwnershipAt(uint256 index)
    public
    view
    returns (TokenOwnership memory)
  {
    return _ownerships[index];
  }

  function totalMinted() public view returns (uint256) {
    return _totalMinted();
  }
}
