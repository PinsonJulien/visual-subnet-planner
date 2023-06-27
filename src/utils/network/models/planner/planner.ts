import IPv4 from "../IPv4/IPv4";
import Netmask from "../netmask/netmask";
import Subnet from "../subnet/subnet";

export default class Planner {
  private _ip: IPv4;
  private _netmask: Netmask;
  private _broadcast: IPv4;
  private _lastPossibleIp: IPv4;

  private _machines: number[];
  private _subnets: Subnet[];
  private _lastNetwork: IPv4;

  constructor(ip: IPv4, machines: number[]) {
    this.ip = ip;
    this.machines = machines;

    this.calculate();
  }

  public get ip(): IPv4 {
    return this._ip;
  }

  protected set ip(ip: IPv4) {
    this._ip = ip;
  }

  public get netmask(): Netmask {
    return this._netmask;
  }

  protected set netmask(netmask: Netmask) {
    this._netmask = netmask;
  }

  public get broadcast(): IPv4 {
    return this._broadcast;
  }

  protected set broadcast(broadcast: IPv4) {
    this._broadcast = broadcast;
  }

  public get machines(): number[] {
    return this._machines;
  }

  protected set machines(machines: number[]) {
    this._machines = machines;
  }

  public get subnets(): Subnet[] {
    return this._subnets;
  }

  protected set subnets(subnets: Subnet[]) {
    this._subnets = subnets;
  }

  public get lastNetwork(): IPv4 {
    return this._lastNetwork;
  }

  public get lastPossibleIp(): IPv4 {
    return this._lastPossibleIp;
  }

  protected set lastPossibleIp(ip: IPv4) {
    this._lastPossibleIp = ip;
  }

  private calculate(): void {
    this.calculateLastPossibleIp();
    const subnets = [];
    const machines = this.machines;
    const len = machines.length;
    const lastPossibleIpValue = this.lastPossibleIp.toNumber() - 2;
    let ip = this.ip;
    let isAtLimit = false;

    for (let i = 0; i < len && !isAtLimit; i++) {
      const difference = lastPossibleIpValue - ip.toNumber();
      if (difference < machines[i]) {
        machines[i] = difference;
        isAtLimit = true;
      }

      const subnet = new Subnet(ip, machines[i]);

      subnets.push(subnet);

      ip = subnet.nextSubnetNetwork;
    }
    
    // Add the last subnet to keep the next network ip.
    this._lastNetwork = ip;

    this.subnets = subnets;
  }

  private calculateLastPossibleIp(): void {
    const exponent =  32 - this.ip.cidr;
    const machines = Math.pow(2, exponent);
    const ipValue = this.ip.toNumber() + machines;

    this.lastPossibleIp = IPv4.fromNumber(ipValue);
    this.netmask = new Netmask(this.ip.cidr);
    this.broadcast = IPv4.fromNumber(ipValue - 1);
  }
}