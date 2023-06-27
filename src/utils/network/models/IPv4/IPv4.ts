import Netmask from "../netmask/netmask";

export default class IPv4 {
  private _values: number[];
  private _cidr: number;
  private _netmask: Netmask;

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

  protected set cidr(cidr: number) {
    this._cidr = cidr;
    this.netmask = new Netmask(cidr);
  }

  public get netmask(): Netmask {
    return this._netmask;
  }

  protected set netmask(netmask: Netmask) {
    this._netmask = netmask;
  }

  public toString(): string {
    return this.values.join('.');
  }

  public toStringWithCIDR(): string {
    return this.toString() + '/' + this._cidr;
  }

  public toNumber(): number {
    return this.values.reduce((prev, curr, index) => {
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