const fs = require('fs');
const { transformAddress, templateAddress, loadAddressData, run } = require('../app/index');

describe('address label printer', () => {
  describe('transforming an address', () => {
    it('prints all address fields', () => {
      const data = {
        recipient: 'Sam Smith',
        addressLine1: 'My flat name',
        addressLine2: 'My Apartment building',
        addressLine3: 'My complex',
        addressLine4: 'My Street',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      };
      expect(transformAddress(data)).toEqual([
        'Sam Smith',
        'My flat name',
        'My Apartment building',
        'My complex',
        'My Street',
        'My Town',
        'My Region',
        'UK',
        'MY1 2HR',
      ]);
    });

    it('ignores empty lines', () => {
      const data = {
        recipient: 'Sam Smith',
        addressLine1: '7 My Road',
        addressLine2: '',
        addressLine3: '',
        addressLine4: '',
        locality: 'My Town',
        region: 'My Region',
        country: 'UK',
        postcode: 'MY1 2HR',
      };
      expect(transformAddress(data)).toEqual([
        'Sam Smith',
        '7 My Road',
        'My Town',
        'My Region',
        'UK',
        'MY1 2HR',
      ]);
    });
  });

  describe('templating a label', () => {
    it('draws beginning and end lines', () => {
      const addressList = ['one', 'two', 'three'];
      expect(templateAddress(addressList)).toMatch(/\+(-){8}.*/);
    });
    it('places address list items on new lines', () => {
      const addressList = ['one', 'two', 'three'];
      expect(templateAddress(addressList)).toMatch('+--------\none\ntwo\nthree');
    });
  });

  describe('loading the data', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('fails when there is no data', async () => {
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      const error = new Error('oops');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(error));

      await expect(loadAddressData()).rejects.toEqual(error);
    });

    it('parses the JSON file with address data', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      await expect(loadAddressData()).resolves.toEqual(fixture);
    });
  });

  describe('running the application', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('prints out a list of labels', async () => {
      const fixture = [
        {
          recipient: 'Sam Smith',
          addressLine1: 'My flat name',
          addressLine2: 'My Apartment building',
          addressLine3: 'My complex',
          addressLine4: 'My Street',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY1 2HR',
        },
        {
          recipient: 'Alex Johnson',
          addressLine1: 'My place',
          addressLine2: '',
          addressLine3: '',
          addressLine4: '',
          locality: 'My Town',
          region: 'My Region',
          country: 'UK',
          postcode: 'MY2 3PL',
        },
      ];
      const fsReadFileSpy = jest.spyOn(fs, 'readFile');
      fsReadFileSpy.mockImplementation((path, enc, cb) => cb(null, JSON.stringify(fixture)));
      // eslint-disable-next-line no-console
      console.log = jest.fn();

      await run();
      // eslint-disable-next-line no-console
      const message = console.log.mock.calls[0][0];
      expect(message).toMatchSnapshot();
    });
  });
});
