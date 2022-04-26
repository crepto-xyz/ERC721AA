// SPDX-License-Identifier: MIT
// Creator: Xing @nelsonie

pragma solidity ^0.8.6;

import "./ERC721A.sol";


contract TestERC721A is ERC721A {
  using Strings for uint256;

  constructor() ERC721A("ERC721A", "ERC721A") {
  }

  function mintTest(uint amount) external {
    _safeMint(msg.sender, amount);
  }
}
