import React from "react";
import Web3 from "web3";
import Artwork from "./Artwork.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class NFT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: null,
      account: null,
      nft: null,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const contractAddress = "0xYourContractAddress";
    const contractABI = Artwork.abi;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    this.setState({ contract });

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const nft = await contract.methods.tokenURI(this.props.match.params.id).call();
    this.setState({ nft });
  }

  render() {
    return (
      <div>
        <h1>NFT Details</h1>
        <p>Token ID: {this.props.match.params.id}</p>
        <p>Owner: {this.state.account}</p>
        <p>NFT URI: {this.state.nft}</p>
      </div>
    );
  }
}

export default NFT;
