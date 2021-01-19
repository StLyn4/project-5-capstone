import {createJSXElement} from '../../jsx-runtime';

export default (<div className="content">
  <p className="header">Travel information</p>
  <hr />
  <label>Flight from: <input data-out-name="flightFrom"></input></label>
  <label>Flight to: <input data-out-name="flightTo"></input></label>
  <hr />
  <label>Lodging address<br />(1 line - 1 address): <textarea data-out-name="lodg"></textarea></label>
  <label>Todo list<br />(1 line - 1 point): <textarea data-out-name="todo" data-out-can-be-empty></textarea></label>
  <hr />
  <label>Notes: <textarea data-out-name="notes" data-out-can-be-empty></textarea></label>
  <a className="btn" data-out-is-submit>Confirm changes</a>
</div>);
