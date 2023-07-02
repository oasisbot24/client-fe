const openLink = (link: string) => {
  const {shell} = window.require('electron');
  shell.openExternal(link);
};

export default openLink;
