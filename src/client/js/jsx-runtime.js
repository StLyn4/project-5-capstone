export const createJSXElement = (tagName, attrs = {}, ...children) => {
  const elem = tagName === 'fragment' ?
    document.createDocumentFragment() :
    Object.assign(document.createElement(tagName), attrs);
  for (const child of children.filter(el => el !== null)) {
    if (Array.isArray(child)) elem.append(...child);
    else elem.append(child);
  }
  return elem;
};
