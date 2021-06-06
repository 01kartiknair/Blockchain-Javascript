const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(blockNo, timestamp, data, previousHash=''){
        this.blockNo= blockNo;
        this.timestamp= timestamp;
        this.data= data;
        this.previousHash= previousHash;
        this.hash= this.calculateHash();

    }
    calculateHash(){
        return SHA256(this.blockNo + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "06/06/2021", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];

    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock= this.chain[i];
            const previousBlock= this.chain[i-1];
            if(currentBlock.hash!==currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash!==previousBlock.hash){
                return false;
            }
            else{
                return true;
            }
        }
    }
}

let testcoin= new Blockchain();
testcoin.addBlock(new Block(1, "08/06/2021", {amount : 10}));
testcoin.addBlock(new Block(2, "09/06/2021", {amount : 4}));

//TO CONSOLE LOG THE ENTIRE BLOCKCHAIN
console.log(JSON.stringify(testcoin, null, 4));


//TO CHECK IF BLOCKCHAIN IS VALID
console.log("Is the Blockchain valid? "+testcoin.isChainValid());

//TO CHECK IF BLOCKCHAIN IS VALID WHEN DATA OR HASH VALUE IS MODIFIED/TAMPERED WITH
testcoin.chain[1].data= {amount : 100};
testcoin.chain[1].hash= "5928205e6358f4112bdd3d3cbcf78a95";
console.log("Is the Blockchain valid? "+testcoin.isChainValid());