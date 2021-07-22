export const sc = (str, key) => {
  return (str || '').toString().toLocaleLowerCase('tr-TR').indexOf((key || '').toString().toLocaleLowerCase('tr-TR')) !== -1;
}