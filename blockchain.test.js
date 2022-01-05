const Blockchain = require('./blockchain')
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain

    beforeEach(() => {
        blockchain = new Blockchain();
    })

    it('contains `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo-bar';
        blockchain.addBlock({ data: newData });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', () => {
        describe('when chain does not start with genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake-genesis' };
                expect(Blockchain.chain.isValidChain(blockchain.chain)).toBe(false)
            })
        });

        describe('then then chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({ data: 'Cat' });
                blockchain.addBlock({ data: 'Kitty' });
                blockchain.addBlock({ data: 'Gato' });
            })

            describe('and a lastHash reference has change', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.chain.isValidChain(blockchain.chain)).toBe(false)
                })
            });
            describe('and the chain contains a block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'some evil data';

                    expect(Blockchain.chain.isValidChain(blockchain.chain)).toBe(false)

                });
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.chain.isValidChain(blockchain.chain)).toBe(true)
                })
            })
        });
    })
})