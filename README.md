# Introduction

ERC721AA is optimized the following items based on ERC721A:
* Remove "burn" method and relative storage
* Remove "TokenOwnership" struct, only keep "ownerAddress"
* Remove "AddressData" struct, only keep "balance"
* Replace tokenId's type uint256 with uint16, assume NFT totalSupply can't exceed 65535 - 1

We did gas measurements test on Rinkeby test, comparing ERC721 by OpenZeppelin, ERC721A by Azuki and ERC721AA by Crepto.

Here are contract address:
* ERC721（OpenZeppelin）: [0xE411909726B9B33fB30Cc750D7A7f046C4659945](https://rinkeby.etherscan.io/address/0xE411909726B9B33fB30Cc750D7A7f046C4659945#code)

* ERC721A（Azuki）：[0xE0F58459c377B71b3E68e6E99Dbe746dbFd6b64F](https://rinkeby.etherscan.io/address/0xE0F58459c377B71b3E68e6E99Dbe746dbFd6b64F#code)

* ERC721AA（Crepto Pass）：[0xcc468bFaa348d37681B194d46f8f7143fDBcE588](https://rinkeby.etherscan.io/address/0xcc468bFaa348d37681B194d46f8f7143fDBcE588#code)


Result:
| NUMBER MINTED | GAS USED (ERC721) | GAS USED (ERC721A) | GAS USED (ERC721AA) |
| --- | --- | --- | --- |
| Mint 1 | [58,093](https://rinkeby.etherscan.io/tx/0xc4ab57aab03f2cf369230990c128af60899e647bcb6c85302615179f885abcc1) | [57,733](https://rinkeby.etherscan.io/tx/0x54c89a43e5cd86fdadba718c8cf1eda0578221efe0197fff2b93a24461a4f1b5) | [57,008](https://rinkeby.etherscan.io/tx/0x6c45f67a0fccba1bbde85f2f4edb61d46deb650b619528d48ee784eab53f02d0) |
| Mint 2 | [84,051](https://rinkeby.etherscan.io/tx/0xf9984baf2084e4f7830c11a281357681d7dce86be985e88125c7173aea65364c) | [59,693](https://rinkeby.etherscan.io/tx/0x5dc74351976393db8f687af1799b668f6bde5e3c9ee8842bf46510c83d780f2b) | [58,986](https://rinkeby.etherscan.io/tx/0x9f02133ac488d0aa158c6255c965eb1109cdd377f8671d66f97ec2d0545ad572) |
| Mint 3 | [110,009](https://rinkeby.etherscan.io/tx/0xbe09cb72ecb3974154ecd9e0b52c5b16bbcc336982a201edd920f07ebb44cc83) | [61,653](https://rinkeby.etherscan.io/tx/0x80b651f85a5668c2b3b931711cd7d1cc2474be0f795fa2e8cbbf43dda25399eb) | [60,964](https://rinkeby.etherscan.io/tx/0xef19e24ff5858ebaabf8f6d099be143c39ab2bfb0e35b68ad57bde84d11508f1) |
| Mint 4 | [135,967](https://rinkeby.etherscan.io/tx/0x9046ef41f6dab8f988ae9f2a88854d23b81e725bb44989811527a89c5d33a350) | [63,613](https://rinkeby.etherscan.io/tx/0x36b98aea5121b88792904b7f6e738a6fa1aec448fd392ff22ba6eaf822841c86) | [62,942](https://rinkeby.etherscan.io/tx/0xf2e28c1918338bac157ab51df03422a51c08ebaac29397256bf4c8b1aa014153) |
| Mint 5 | [161,925](https://rinkeby.etherscan.io/tx/0x731a9d9c9bc5f6afbd9eb8a6ee0d7fdd3c5920acd871605aa468909241f7e7d1) | [65,573](https://rinkeby.etherscan.io/tx/0x557a251ca0e87cced08dc8a527ddd3c58950427ce376dad06c24c59d00e2a80f) | [64,920](https://rinkeby.etherscan.io/tx/0xa7e04d35ce5fe90555c9642ee718c4bde26147281d12662d81a4758dbaeea1cf) |

