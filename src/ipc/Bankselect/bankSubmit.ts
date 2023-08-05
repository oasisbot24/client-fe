import channel from '@channel';

const selectBank = (bankname: String) => {
  const data = {
    bankname: bankname,
  };
  const {ipcRenderer} = window.require('electron');
  //console.log(data);
  ipcRenderer.send(channel.bankselect.bank.select, data);
};

export default selectBank;
