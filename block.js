const { GENESIS_DATA } = require('./config');

class Block {
    constructor({ timestamp, lastHash, hash, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    };

    static mineBlock({ lastBlock, data }) {
        return new this({
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            data
        });
    }
};

// const block1 = new Block({
//     timestamp: '01/01/21',
//     lastHash: 'foo-lastHash',
//     hash: 'foo-data',
//     data: 'data'
// })

module.exports = Block