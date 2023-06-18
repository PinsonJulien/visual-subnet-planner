import { describe, expect, it } from 'vitest';
import IPv4 from '../IPv4/IPv4';
import Subnet from './subnet';

describe('Subnet', () => {

  it('Should calculate everything properly', () => {
    let subnet = new Subnet(IPv4.fromString('10.0.0.0/20'), 1_000_000);
    expect(subnet.ip.toString()).toBe('10.0.0.0');
    expect(subnet.machines).toBe(1_000_000);
    expect(subnet.maxAddresses).toBe(1_048_576);
    expect(subnet.cidr).toBe(12);
    expect(subnet.netmask.toString()).toBe('255.240.0.0');
    expect(subnet.network.toString()).toBe('10.0.0.0');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.16.0.0');
    expect(subnet.broadcast.toString()).toBe('10.15.255.255');

    subnet = new Subnet(IPv4.fromString('10.16.0.0/12'), 500_000);
    expect(subnet.ip.toString()).toBe('10.16.0.0');
    expect(subnet.machines).toBe(500_000);
    expect(subnet.maxAddresses).toBe(524_288);
    expect(subnet.cidr).toBe(13);
    expect(subnet.netmask.toString()).toBe('255.248.0.0');
    expect(subnet.network.toString()).toBe('10.16.0.0');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.0.0');
    expect(subnet.broadcast.toString()).toBe('10.23.255.255');

    subnet = new Subnet(IPv4.fromString('10.24.0.0/13'), 500);
    expect(subnet.ip.toString()).toBe('10.24.0.0');
    expect(subnet.machines).toBe(500);
    expect(subnet.maxAddresses).toBe(512);
    expect(subnet.cidr).toBe(23);
    expect(subnet.netmask.toString()).toBe('255.255.254.0');
    expect(subnet.network.toString()).toBe('10.24.0.0');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.0');
    expect(subnet.broadcast.toString()).toBe('10.24.1.255');

    subnet = new Subnet(IPv4.fromString('10.24.2.0/23'), 100);
    expect(subnet.ip.toString()).toBe('10.24.2.0');
    expect(subnet.machines).toBe(100);
    expect(subnet.maxAddresses).toBe(128);
    expect(subnet.cidr).toBe(25);
    expect(subnet.netmask.toString()).toBe('255.255.255.128');
    expect(subnet.network.toString()).toBe('10.24.2.0');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.128');
    expect(subnet.broadcast.toString()).toBe('10.24.2.127');

    subnet = new Subnet(IPv4.fromString('10.24.2.128/25'), 10);
    expect(subnet.ip.toString()).toBe('10.24.2.128');
    expect(subnet.machines).toBe(10);
    expect(subnet.maxAddresses).toBe(16);
    expect(subnet.cidr).toBe(28);
    expect(subnet.netmask.toString()).toBe('255.255.255.240');
    expect(subnet.network.toString()).toBe('10.24.2.128');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.144');
    expect(subnet.broadcast.toString()).toBe('10.24.2.143');
  });

});