import {createJSXElement} from '../../jsx-runtime';

export default JSX => {
  const object = (<div className="wrapped">
    {JSX}
  </div>);

  object.onclick = e => {
    if (e.target === object) {
      object.remove();
    }
  };

  return object;
}
