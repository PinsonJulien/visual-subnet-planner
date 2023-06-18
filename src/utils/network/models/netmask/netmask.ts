export default class Netmask {
  private _value: number[];
  private _cidr: number;
  private _magicNumber: number;
  
  constructor(cidr: number) {
    this.cidr = cidr;
  }

  public get value(): number[] {
    return [...this._value];
  }

  protected set value(value: number[]) {
    this._value = value;
    this.magicNumber = this.calculateMagicNumber();
  }

  public get cidr(): number {
    return this._cidr;
  }

  protected set cidr(value: number) {
    this._cidr = value;
    this.value = this.calculateValue();
  }

  public get magicNumber(): number {
    return this._magicNumber;
  }

  protected set magicNumber(value: number) {
    this._magicNumber = value;
  }

  private calculateValue(): number[] {
    const netmask = [];
    let cidr = this.cidr;

    for (let i = 0; i < 4; i++) {
      let value = 0;

      if (cidr >= 8) {
        value = 255;
        cidr -= 8;
      } 
      else if (cidr > 0) {
        value = 256 - Math.pow(2, 8 - cidr);
        cidr = 0;
      }

      netmask.push(value);
    }

    return netmask;
  }

  private calculateMagicNumber(): number {
    let magicNumber = 0;

    for (let i = 0; i < 4 && magicNumber == 0; i++) {
      const value = this.value[i];

      if (value === 255)
        continue;

      magicNumber = 256 - value;
    }

    return magicNumber;
  }


  public toString(): string {
    return this.value.join(".");
  }
}