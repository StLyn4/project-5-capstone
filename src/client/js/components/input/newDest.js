import {createJSXElement} from '../../jsx-runtime';

export default (<div className="content">
  <p className="header">Travel information</p>
  <hr />
  <label className="req">Destination: <input data-out-name="dest"></input></label>
  <hr />
  <label className="req">Departing date: <input type="date" data-out-name="depDate"></input></label>
  <label className="req">Departing time: <input type="time" value="09:00" data-out-name="depTime"></input></label>
  <hr />
  <label className="req">End of stay date: <input type="date" data-out-name="endDate"></input></label>
  <label className="req">End of stay time: <input type="time" value="09:00" data-out-name="endTime"></input></label>
  <hr />
  <label className="req">Flight from: <input data-out-name="flightFrom"></input></label>
  <label className="req">Flight to: <input data-out-name="flightTo"></input></label>
  <hr />
  <label className="req">Lodging address<br />(1 line - 1 address): <textarea data-out-name="lodg"></textarea></label>
  <label>Todo list<br />(1 line - 1 point): <textarea data-out-name="todo" data-out-can-be-empty></textarea></label>
  <hr />
  <label>Notes: <textarea data-out-name="notes" data-out-can-be-empty></textarea></label>
  <a className="btn center" data-out-is-submit>Create destination</a>
</div>);
