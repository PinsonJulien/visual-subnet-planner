import { describe, expect, it } from 'vitest';
import IPv4 from '../IPv4/IPv4';
import Planner from './planner';

describe('Planner', () => {

  it('Should calculate everything properly', () => {

    let planner = new Planner(IPv4.fromString('10.0.0.0/20'), [
      1_000_000,
      500_000,
      500,
      100,
      10
    ]);

    expect(planner.subnets[0].ip.toString()).toBe('10.0.0.0');
    expect(planner.machines).toEqual([1_000_000, 500_000, 500, 100, 10]);
    let subnet = planner.subnets[0];
    expect(subnet.machines).toBe(1_000_000);
    expect(subnet.broadcast.toString()).toBe('10.15.255.255');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.16.0.0');
    subnet = planner.subnets[1];
    expect(subnet.machines).toBe(500_000);
    expect(subnet.broadcast.toString()).toBe('10.23.255.255');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.0.0');
    subnet = planner.subnets[2];
    expect(subnet.machines).toBe(500);
    expect(subnet.broadcast.toString()).toBe('10.24.1.255');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.0');
    subnet = planner.subnets[3];
    expect(subnet.machines).toBe(100);
    expect(subnet.broadcast.toString()).toBe('10.24.2.127');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.128');
    subnet = planner.subnets[4];
    expect(subnet.machines).toBe(10);
    expect(subnet.broadcast.toString()).toBe('10.24.2.143');
    expect(subnet.nextSubnetNetwork.toString()).toBe('10.24.2.144');
    subnet = planner.subnets[5];
    expect(subnet.machines).toBe(0);
    expect(subnet.network.toString()).toBe('10.24.2.144');

  });

});