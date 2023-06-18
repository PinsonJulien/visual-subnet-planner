import IPv4 from "../IPv4/IPv4";
import Subnet from "../subnet/subnet";

export default class Planner {
  private _ip: IPv4;
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

  public calculate(): void {
    const subnets = [];
    const machines = this.machines;
    const len = machines.length;
    let ip = this.ip;

    for (let i = 0; i < len; i++) {
      const subnet = new Subnet(ip, machines[i]);

      subnets.push(subnet);

      ip = subnet.nextSubnetNetwork;
    }
    
    // Add the last subnet to keep the next network ip.
    this._lastNetwork = ip;

    this.subnets = subnets;
  }
}