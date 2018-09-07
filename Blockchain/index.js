const Block = require('./block');

class Blockchain
{
    constructor()
    {
        this.chain = [Block.genesis()];
    }

    addBlock(data)
    {
        const lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
     }

     isValidChain(chain)
     {
        //  console.log('chain = ', chain);
        //  console.log('chain[0] = ', (chain[0]));

        //  console.log('genesis block = ', JSON.stringify(Block.genesis()));

         if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis()))
         {
             console.log('First Block isn\'t genesis block.');
             return false;
         }

         for (let i=1; i<chain.length; i++)
         {
             const block = chain[i];
             const lastBlock = chain[i-1];

             if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block))
             {
                 console.log('Hash doesn\'t match.');
                return false;
             }
         }
         
         return true;
     }

     replaceChain(newChain)
     {
        //  console.log('new chain = ', newChain);
        //  console.log('current chain = ', this.chain)
        if(newChain.length<=this.chain.length)
        {
            console.log('Received chain is not longer than the current chain.');
            return;
        }
        else if(!this.isValidChain(newChain))
        {
            console.log('Received chain is invalid.');
            return; 
        }
        else
        {
            console.log('Replacing chain...')
             this.chain = newChain;
        }
     }
}

module.exports = Blockchain;