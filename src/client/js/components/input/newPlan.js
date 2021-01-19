import {createJSXElement} from '../../jsx-runtime';

export default (<div className="content">
  <p className="header">Travel information</p>
  <hr />
  <label className="req">Plan name: <input data-out-name="name"></input></label>
  <a className="btn" data-out-is-submit>Create plan</a>
</div>);
