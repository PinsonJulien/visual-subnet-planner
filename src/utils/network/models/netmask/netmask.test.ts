import { describe, expect, it } from 'vitest';
import Netmask from './netmask';

describe('Netmask', () => {

  it('Should have a valid value from CIDR', () => {
    let netmask = new Netmask(24);
    expect(netmask.cidr).toBe(24);
    expect(netmask.value).toEqual([255, 255, 255, 0]);

    netmask = new Netmask(16);
    expect(netmask.cidr).toBe(16);
    expect(netmask.value).toEqual([255, 255, 0, 0]);

    netmask = new Netmask(8);
    expect(netmask.cidr).toBe(8);
    expect(netmask.value).toEqual([255, 0, 0, 0]);

    netmask = new Netmask(0);
    expect(netmask.cidr).toBe(0);
    expect(netmask.value).toEqual([0, 0, 0, 0]);

    netmask = new Netmask(32);
    expect(netmask.cidr).toBe(32);
    expect(netmask.value).toEqual([255, 255, 255, 255]);

    netmask = new Netmask(31);
    expect(netmask.cidr).toBe(31);
    expect(netmask.value).toEqual([255, 255, 255, 254]);

    netmask = new Netmask(14);
    expect(netmask.cidr).toBe(14);
    expect(netmask.value).toEqual([255, 252, 0, 0]);
  });
  
  it('Should have a valid magic number from CIDR', () => {
    let netmask = new Netmask(24);
    expect(netmask.magicNumber).toBe(256);

    netmask = new Netmask(12);
    expect(netmask.magicNumber).toBe(16);

    netmask = new Netmask(13);
    expect(netmask.magicNumber).toBe(8);

    netmask = new Netmask(23);
    expect(netmask.magicNumber).toBe(2);

    netmask = new Netmask(25);
    expect(netmask.magicNumber).toBe(128);

    netmask = new Netmask(28);
    expect(netmask.magicNumber).toBe(16);
  });

});
