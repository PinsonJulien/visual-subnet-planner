import { describe, expect, it } from 'vitest';
import IPv4 from './ipv4';

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

  it('Should have a valid netmask from CIDR', () => {
    let ipv4 = new IPv4([192, 168, 0, 1], 24);
    expect(ipv4.netmask).toEqual([255, 255, 255, 0]);

    ipv4 = new IPv4([192, 168, 0, 1], 16);
    expect(ipv4.netmask).toEqual([255, 255, 0, 0]);

    ipv4 = new IPv4([1, 0, 0, 1], 8);
    expect(ipv4.netmask).toEqual([255, 0, 0, 0]);
  });

  it('Should have a valid magic number from CIDR', () => {
    let ipv4 = new IPv4([192, 168, 0, 1], 12);
    expect(ipv4.magicNumber).toEqual(16);

    ipv4 = new IPv4([192, 168, 0, 1], 13);
    expect(ipv4.magicNumber).toBe(8);

    ipv4 = new IPv4([1, 0, 0, 1], 23);
    expect(ipv4.magicNumber).toBe(2);

    ipv4 = new IPv4([1, 0, 0, 1], 25);
    expect(ipv4.magicNumber).toBe(128);

    ipv4 = new IPv4([1, 0, 0, 1], 28);
    expect(ipv4.magicNumber).toBe(16);
  });

});