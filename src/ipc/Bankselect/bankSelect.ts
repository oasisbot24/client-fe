import bankSubmit from '@ipc/Bankselect/bankSubmit';

const bankSelect = (e, bankname: String) => {
  e.preventDefault();
  bankSubmit(bankname);
};

export default bankSelect;
