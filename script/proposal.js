const { ethers } = require("ethers");


const executeProposal = async (addressArray) => {

const titleTextBox = document.getElementById("title");
const requiredVoteTextBox = document.getElementById("vote");

  if (typeof window.ethereum !== "undefined") {
    contractAddress = "0xdB0C4ecFD641a81149d6B56E662379E5E72b7653";
    const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "address[]",
          "name": "_participant",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_requiredCount",
          "type": "uint256"
        }
      ],
      "name": "createNewProposal",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const tx = await contract.createNewProposal(titleTextBox.value,addressArray,requiredVoteTextBox.value);
      const receipt = provider.waitForTransaction(tx.hash, 1, 150000);
      receipt.then(function(result) {
      const data = result;
      const newContractAddress = data.logs[0].data;
      const formattedNewContractAddress = newContractAddress.slice(0, 2).concat(newContractAddress.slice(26,));
      var details = {
        'title': titleTextBox.value,
        'contractaddress': formattedNewContractAddress
       };
    
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('/proposal/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(response => response.json())
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("executeButton").innerHTML =
      "Please install MetaMask";
  }
}

module.exports = { executeProposal };