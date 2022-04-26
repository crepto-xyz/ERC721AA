// SPDX-License-Identifier: MIT
// Creator: Xing @nelsonie

pragma solidity ^0.8.6;

import "./ERC721AA.sol";


contract TestERC721AA is ERC721AA {
  using Strings for uint256;

  constructor() ERC721AA("ERC721AA", "ERC721AA") {
  }

  function mintTest(uint amount) external {
    _safeMint(msg.sender, amount);
  }
}
