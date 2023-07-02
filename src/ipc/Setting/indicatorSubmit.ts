const indicatorSubmit = (e, setIsUpdate: Function) => {
  e.preventDefault();
  setIsUpdate(false);
};

export default indicatorSubmit;
