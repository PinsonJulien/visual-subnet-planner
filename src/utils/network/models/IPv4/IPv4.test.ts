import { describe, expect, it } from 'vitest';
import IPv4 from './IPv4';

describe('IPv4', () => {
  it('should be able to construct an IPv4 address', () => {
    
    let ipv4 = new IPv4([192, 168, 0, 1], 24);
    expect(ipv4.values).toEqual([192, 168, 0, 1]);
    expect(ipv4.cidr).toBe(24);

    ipv4 = new IPv4([192, 168, 0, 1], 16);
    expect(ipv4.values).toEqual([192, 168, 0, 1]);
    expect(ipv4.cidr).toBe(16);
  });

  it('should be able to convert an IPv4 address to a string', () => {
    let ipv4 = new IPv4([192, 168, 0, 1], 24);
    expect(ipv4.toString()).toBe('192.168.0.1');

    ipv4 = new IPv4([192, 168, 0, 1], 16);
    expect(ipv4.toString()).toBe('192.168.0.1');

    ipv4 = new IPv4([1, 0, 0, 1], 8);
    expect(ipv4.toString()).toBe('1.0.0.1');
  });

  it('should be able to convert an IPv4 address to a string with CIDR', () => {
    let ipv4 = new IPv4([192, 168, 0, 1], 24);
    expect(ipv4.toStringWithCIDR()).toBe('192.168.0.1/24');

    ipv4 = new IPv4([192, 168, 0, 1], 16);
    expect(ipv4.toStringWithCIDR()).toBe('192.168.0.1/16');

    ipv4 = new IPv4([1, 0, 0, 1], 8);
    expect(ipv4.toStringWithCIDR()).toBe('1.0.0.1/8');
  });

  it('should be able to convert an IPv4 address to a number', () => {
    let ipv4 = new IPv4([192, 168, 0, 1], 24);
    expect(ipv4.toNumber()).toBe(3232235521);

    ipv4 = new IPv4([192, 168, 0, 1], 16);
    expect(ipv4.toNumber()).toBe(3232235521);

    ipv4 = new IPv4([1, 0, 0, 1], 8);
    expect(ipv4.toNumber()).toBe(16777217);
  });

});