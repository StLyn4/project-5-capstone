import {createJSXElement} from '../jsx-runtime';
import './Destination';
import inputForm from './input';
import newDest from './input/newDest';

class Plan extends HTMLElement {
  // Creates and returns a new travel destination
  newDest = data => {
    return (<trip-destination
      dest={data.dest}
      departing={data.departing}
      end={data.end}
      flight={data.flight}
      lodg={data.lodg}
      todo={data.todo}
      notes={data.notes}
      onDelete={this.deleteDestHandler}
    />);
  };

  deleteHandler = e => {
    this.remove();
    this.unmounted = true;
  };

  // Removes the destination target.
  // If there are no more, then the plan itself deletes.
  deleteDestHandler = dest => {
    dest.remove();
    const indexOfDest = this.dests.indexOf(dest);
    if (indexOfDest > -1) {
      this.dests.splice(indexOfDest, 1);
    }
    if (this.dests.length === 0) {
      this.deleteHandler();
    }
  };

  /*printHandler = e => {
    // placeholder for printing / PDF
    // Canceled because there were too many bugs
  };*/

  newDestHandler = e => {
    inputForm(newDest, (result, form) => {
      form.remove();

      this.dests.push(this.newDest({
          dest: result.dest,
          departing: new Date(`${result.depDate} ${result.depTime}`),
          end: new Date(`${result.endDate} ${result.endTime}`),
          flight: {from: result.flightFrom, to: result.flightTo},
          lodg: window.parseList(result.lodg),
          todo: window.parseList(result.todo, ['Do nothing']),
          notes: result.notes || null
      }));
      this.render();
    }, '#inputForm');
  };

  render() {
    this.dests.sort((dist1, dist2) => {
      return dist1.departing - dist2.departing;
    });

    this.innerHTML = '';
    this.appendChild(<>
      <div className="header">
        <p className="name">
          {this.name}
        </p>
        <div className="ctrl-plan">
          <span className="delete" onclick={this.deleteHandler}><i className="fas fa-times"></i></span>
          {/*<span className="print" onclick={this.printHandler}><i className="far fa-file-pdf"></i></span>*/}
        </div>
      </div>
      <div className="destinations">
        {this.dests}
      </div>
      <a className="btn large center add-dest-btn" onclick={this.newDestHandler}><i className="fas fa-plus-square"></i> Add destination</a>
    </>);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.dests = this.destsData.map(destData => this.newDest(destData));
      this.render();
      this.rendered = true;
    }
  }
}

customElements.define('trip-plan', Plan);
