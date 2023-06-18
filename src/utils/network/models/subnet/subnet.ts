import IPv4 from "../IPv4/IPv4";
import Netmask from "../netmask/netmask";

export default class Subnet {
  private _ip: IPv4;
  private _machines: number;
  private _maxAddresses: number;
  private _cidr: number;
  private _netmask: Netmask;
  private _network: IPv4;
  private _nextSubnetNetwork: IPv4;
  private _broadcast: IPv4;

  constructor(ip: IPv4, machines: number) {
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

  public get machines(): number {
    return this._machines;
  }

  protected set machines(machines: number) {
    this._machines = machines;
  }

  public get maxAddresses(): number {
    return this._maxAddresses;
  }

  protected set maxAddresses(maxAddresses: number) {
    this._maxAddresses = maxAddresses;
  }

  public get cidr(): number {
    return this._cidr;
  }

  protected set cidr(cidr: number) {
    this._cidr = cidr;
  }

  public get netmask(): Netmask {
    return this._netmask;
  }

  protected set netmask(netmask: Netmask) {
    this._netmask = netmask;
  }

  public get network(): IPv4 {
    return this._network;
  }

  protected set network(network: IPv4) {
    this._network = network;
  }

  public get nextSubnetNetwork(): IPv4 {
    return this._nextSubnetNetwork;
  }

  protected set nextSubnetNetwork(nextSubnetNetwork: IPv4) {
    this._nextSubnetNetwork = nextSubnetNetwork;
  }

  public get broadcast(): IPv4 {
    return this._broadcast;
  }

  protected set broadcast(broadcast: IPv4) {
    this._broadcast = broadcast;
  }

  private calculate(): void {
    this.calculateCidr();
    this.calculateNetmask();
    this.calculateNetwork();
    this.calculateNextSubnetNetwork();
    this.calculateBroadcast();
  }  

  private calculateCidr(): void {
    const machines = this.machines + 2;

    const exponent = Math.ceil(Math.log(machines) / Math.log(2));
    this.cidr = 32 - exponent;
    this.maxAddresses = Math.pow(2, exponent);
  }

  private calculateNetmask(): void {
    this.netmask = new Netmask(this.cidr);
  }

  private calculateNetwork(): void {
    this.network = new IPv4(this.ip.values, this.cidr);
  }

  private calculateNextSubnetNetwork(): void {
    const networkValue = this.network.toNumber();
    const nextSubnetNetworkValue = networkValue + this.maxAddresses;
  
    this.nextSubnetNetwork = IPv4.fromNumber(nextSubnetNetworkValue);
  }

  private calculateBroadcast(): void {
    // calculate the last possible address of the subnet.
    const lastAddress = this.nextSubnetNetwork.toNumber() - 1;
    this.broadcast = IPv4.fromNumber(lastAddress);
  }  
}