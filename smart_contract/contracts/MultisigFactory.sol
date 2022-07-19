// SPDX-License-Identifier: MIT
pragma solidity >=0.8.5;

import "./Multisig.sol";

contract MultisigFactory {

    event NewProposal(address _address);

    function createNewProposal(string memory _title, address[] memory _participant, uint256 _requiredCount)
        external
        returns (address)   {
        Multisig newContract = new Multisig(_title, _participant, _requiredCount);

        emit NewProposal(address(newContract));
        
        return address(newContract);
    }
  
}
