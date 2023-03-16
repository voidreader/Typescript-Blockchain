import crypto from "crypto";

// https://github.com/DefinitelyTyped/DefinitelyTyped 참고
// npm i -D @types/express

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;

  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  // 블록 해시 생성(crypto)
  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    if (this.blocks.length === 0) return "";

    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );

    this.blocks.push(newBlock);
  }

  public getBlocks() {
    // return this.blocks;
    return [...this.blocks]; // 보안을 위해 복사본을 리턴
  }
} // ? end of Blockchain

// 테스트 및 실행 체크
const blockchain = new Blockchain();
blockchain.addBlock("First");
blockchain.addBlock("Second");
blockchain.addBlock("Third");

console.log(blockchain.getBlocks());
