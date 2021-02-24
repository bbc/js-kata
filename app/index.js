const fs = require('fs');
const path = require('path');

const dataFile = path.resolve(__dirname, '../data', 'addresses.json');

const transformAddress = (addressData) => {
  return Object.keys(addressData).reduce((addressList, item) => {
    const line = addressData[item];
    if (line !== '') {
      addressList.push(line);
    }
    return addressList;
  }, []);
};

const templateAddress = (addressList) => {
  const divider = '+--------\n';
  return `${divider}${addressList.join('\n')}`;
};

const loadAddressData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const run = async () => {
  const data = await loadAddressData();
  // eslint-disable-next-line no-console
  console.log(data.map(transformAddress).map(templateAddress).join('\n'));
};

if (require.main === module) {
  run();
} else {
  module.exports = {
    transformAddress,
    templateAddress,
    loadAddressData,
    run,
  };
}
