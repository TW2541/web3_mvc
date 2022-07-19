// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5;

import "./Multisig.sol";

contract MultisigFactory {

    function createNewPurposal(string memory _title, address[] memory _participant, uint256 _requiredCount)
        external
        returns (address)
    {
        Multisig newContract = new Multisig(_title, _participant, _requiredCount);
        return address(newContract);
    }
  
}
