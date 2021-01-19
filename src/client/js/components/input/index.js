import wrapper from './wrapper';

const cache = new WeakMap();
/*
  {HTMLElement_ROOT: {
    <HTMLElement> : {
      name = 'test',
      source = 'value',
    }
  ]}
*/

const findSources = JSX => {
  // JSX.querySelectors won't help
  const result = [];
  for (let i = 0; i < JSX.children.length; i++) {
    result.push(...findSources(JSX.children[i]));
  }
  if (JSX['data-out-name'] || JSX['data-out-is-submit']) {
    return [...result, [
      JSX,                                             // 0: HTML Element
      JSX['data-out-name'],                            // 1: name (a.k.a. nickname) for output
      JSX['data-out-source'] || 'value',               // 2: source prop in HTML Element
      JSX['data-out-match'],                           // 3: the input must match the pattern
      JSX.hasOwnProperty('data-out-is-submit'),        // 4: is submit button
      JSX.hasOwnProperty('data-out-can-be-empty')      // 5: can content be empty
    ]];
  }
  return result;
};

const getSources = JSX => {let sources;
  if (cache.has(JSX)) { // LOAD FROM CACHE
    return cache.get(JSX);
  } else { // First parse and cache creation
    sources = findSources(JSX);
    cache.set(JSX, sources);
    return sources;
  }
}

const validateInput = sources => {
  let isOk = true;
  for (let elem of sources) {
    const [htmlElem, outName, outSource, pattern, isSubmit, canBeEmpty] = elem;
    if (outName) {
      const data = htmlElem[outSource];
      if (pattern && !RegExp(pattern).test(data)) {
        // if a pattern is specified and the input does not match
        isOk = false;
        htmlElem.classList.add('dang-shadow');
      } else if (!canBeEmpty && /^\s*$/.test(data)) {
        // if the input cannot be empty, but it is nevertheless
        isOk = false;
        htmlElem.classList.add('warn-shadow');
      }
    }
  }
  return isOk;
};

// inputForm(JSX_object, callbacl(result, wrapped), [mountSelector])
export default (JSX, callback, mountSelector, defaults = {}) => {
  const sources = getSources(JSX);
  const result = {};
  const wrapped = wrapper(JSX);
  for (let elem of sources) {
    const [htmlElem, outName, outSource, pattern, isSubmit, canBeEmpty] = elem;
    if (outName) { // if there is a name
      if (defaults[outName]) {
        htmlElem[outSource] = defaults[outName];
      }
      result[outName] = htmlElem[outSource];
      htmlElem.onchange = e => {
        result[outName] = htmlElem[outSource];
        htmlElem.classList.remove('dang-shadow');
        htmlElem.classList.remove('warn-shadow');
      };
    } else if (isSubmit) { // or if it's a confirmation button
      htmlElem.onclick = e => {
        validateInput(sources) && callback(result, wrapped);
      };
    } else {
      throw new Error('Attribute "data-out-name" or "data-out-is-submit" must be set');
    }
  }
  try {
    if (mountSelector) {
      const parent = document.querySelector(mountSelector);
      parent.innerHTML = '';
      parent.appendChild(wrapped);
    }
  } catch (err) {
    console.error(`Failed to mount into "${mountSelector}":`, err.message);
  }
  setTimeout(e => {
    wrapped.classList.add('active');
  }, 10);
  return wrapped;
};
