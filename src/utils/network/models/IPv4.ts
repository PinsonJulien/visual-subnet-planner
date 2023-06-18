export default class IPv4 {
  private _values: number[];
  private _cidr: number;
  private _netmask: number[];
  private _magicNumber: number;

  constructor(values: number[], cidr: number) {
    this.values = values;
    this.cidr = cidr;
  }

  public get values(): number[] {
    return [...this._values];
  }

  protected set values(values: number[]) {
    this._values = values;
  }

  public get cidr(): number {
    return this._cidr;
  }

  protected set cidr(value: number) {
    this._cidr = value;
    this.netmask = this.calculateNetmask();
  }

  public get netmask(): number[] {
    return [ ...this._netmask ];
  }

  protected set netmask(value: number[]) {
    this._netmask = value;
    this.magicNumber = this.calculateMagicNumber();
  }

  public get magicNumber(): number {
    return this._magicNumber;
  }
  
  protected set magicNumber(value: number) {
    this._magicNumber = value;
  }

  private calculateNetmask(): number[] {
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
    // cidr: 24 -> 256
    // cidr: 25 -> 128
    // cidr: 26 -> 64

    let magicNumber = 0;

    for (let i = 0; i < 4 && magicNumber == 0; i++) {
      const value = this.netmask[i];

      if (value === 255)
        continue;

      magicNumber = 256 - value;
    }

    return magicNumber;
  }

  public toString(): string {
    return this._values.join('.');
  }

  public toStringWithCIDR(): string {
    return this.toString() + '/' + this._cidr;
  }

  public netmaskToString(): string {
    return this._netmask.join('.');
  }

  public toNumber(): number {
    return this._values.reduce((prev, curr, index) => {
      return prev + curr * Math.pow(256, 3 - index);
    }, 0);
  }

  public static fromString(ipv4: string): IPv4 {
    const [address, cidr] = ipv4.split('/');

    return new IPv4(address.split('.').map(value => parseInt(value)), parseInt(cidr));
  }

  public static fromNumber(ipv4: number): IPv4 {
    const values = [];

    for (let i = 0; i < 4; i++) {
      values.push(ipv4 % 256);
      ipv4 = Math.floor(ipv4 / 256);
    }

    return new IPv4(values.reverse(), 0);
  }
}