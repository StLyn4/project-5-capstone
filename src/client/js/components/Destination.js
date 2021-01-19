import axios from 'axios';
import {createJSXElement} from '../jsx-runtime';
import inputForm from './input';
import destInfo from './input/destInfo';

const oneDay = 86400000; // in ms;

class Destination extends HTMLElement {
  // Fahrenheit to Celsius conversion
  static FtoC(F) {
    return +(Math.round((F - 32) * 5 / 9 + 'e+1') + 'e-1');
  }

  // Get weather forecast for <daysCount> day(-s) from the date of departure + img
  fetchOnlineInfo = (daysForecastCount = 3) => {
    return axios.get(
      `${location.origin}/api/FetchPlaceData`, {
      params:
      {
        placeName: this.dest
      }
    }).then(data => {
      const {img, weatherData} = data.data;
      // This can be a photo of the desired place, country,
      // or a photo of dogs, if nothing is found. Do you like doggies? :D
      this.photo = img.data;
      this.weather = {};

      const dateWeatherFormat = new Intl.DateTimeFormat('en-EN', {
        month: '2-digit', day: '2-digit'
      });

      for (let i = 0; i < daysForecastCount; i++) {
        const date = new Date(this.departing.getTime() + i * oneDay);
        const weathDate = dateWeatherFormat.format(date);
        const available = weatherData.hasOwnProperty(weathDate);
        const weath = available ? weatherData[weathDate] : {};
        this.weather[this.dateToStringShort(date)] = {
          available: available,
          icon: weath.icon,
          comment: weath.comment,
          tempF: weath.tempF
        };
      }
    });
  }

  // Retrieving data that is not updated during the lifetime of the element
  fetchStaticContent() {
    // this.destination = this.dest;
    // this.departing = this.departing;
    // this.end = this.end;
    this.tripLength = Math.trunc((this.end - this.departing) / oneDay);
    this.daysLeft = Math.trunc((this.departing.getTime() - Date.now()) / oneDay);
  }

  dateToStringDTF = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric'
  });
  dateToString(date) {
    return this.dateToStringDTF.format(date);
  }

  // Retrieving data that can change with each re-render request
  dateToStringShortDTF = new Intl.DateTimeFormat(undefined, {
    month: '2-digit', day: '2-digit'
  });
  dateToStringShort(date) {
    return this.dateToStringShortDTF.format(date);
  }

  // Calling a window for changing data. Processing and applying them
  editCard = e => {
    inputForm(destInfo, (result, form) => {
      form.remove();

      this.flight = {from: result.flightFrom, to: result.flightTo};
      this.lodg = window.parseList(result.lodg);
      this.todo = window.parseList(result.todo, ['Do nothing']);
      this.notes = result.notes;
      this.render();
    }, '#inputForm', {
      flightFrom: this.flight.from,
      flightTo: this.flight.to,
      lodg: this.lodg.join('\n'),
      todo: this.todo.join('\n'),
      notes: this.notes,
    });
  };

  render() {
    let departingStatus;
    if (this.daysLeft === 0) {
      this.classList.add('warn');
      departingStatus = <p className="warn">We will depart within the next 24 hours</p>;
    } else if (this.daysLeft < 0) {
      this.classList.add('dang');
      departingStatus = <p className="dang">{-this.daysLeft} day(-s) overdue!</p>;
    } else {
      this.classList.remove('warn');
      this.classList.remove('dang');
      departingStatus = <p>{this.daysLeft} day(-s) left before the start of the trip</p>;
    }

    this.innerHTML = '';
    this.appendChild(<>
      <div className="left">
        <img src={this.photo} alt="Photo" className="photo" />
        <a className="btn normal e-note-btn" onclick={this.editCard}><i className="fas fa-plane"></i> Edit flight info</a>
        <a className="btn normal e-logd-btn" onclick={this.editCard}><i className="fas fa-bed"></i> Edit lodging info</a>
        <a className="btn normal e-pack-btn" onclick={this.editCard}><i className="fas fa-calendar-check"></i> Edit todo list</a>
        <a className="btn normal e-note-btn" onclick={this.editCard}><i className="fas fa-clipboard-list"></i> Edit notes</a>
      </div>
      <div className="right">
        <h4>Destination: {this.dest}</h4>
        <strong>Departing: {this.dateToString(this.departing)}</strong>
        <strong>End of stay: {this.dateToString(this.end)}</strong>
        <em>(<strong>{this.tripLength}</strong> day(-s) in total)</em>
        <div className="flight-info">
          <strong>Flight info:</strong>
          <div>
            <p className="from"><i className="fas fa-plane-departure"></i> {this.flight.from}</p>
            <p className="to"><i className="fas fa-plane-arrival"></i> {this.flight.to}</p>
          </div>
        </div>
        {departingStatus}
        <p><i className="fas fa-cloud-sun-rain"></i> Approximate weather and temperatures:</p>
        <table className="weather">
          <thead>
            <tr>
              {Object.keys(this.weather).map(date => <td>{date}</td>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(this.weather).map(weath =>
                <td>
                  { weath.available ?
                      <><span title={weath.comment}><img src={weath.icon} alt="" className="weather-icon" /></span><br />
                      <span>{weath.tempF} °F</span><br />
                      <span>{Destination.FtoC(weath.tempF)} °C</span></> :
                    <p>Info for this date isn't available</p>
                  }
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <strong><i className="fas fa-house-user"></i> Possible places of residence:</strong>
        <ul className="lodg-list">
          {this.lodg.map(lodg => <li><i className="far fa-square"></i> {lodg}</li>)}
        </ul>
        <strong><i className="fas fa-calendar-check"></i> Todo list:</strong>
        <ul className="todo-list">
          {this.todo.map(task => <li><i className="far fa-square"></i> {task}</li>)}
        </ul>
        {this.notes ? <p><i className="fas fa-clipboard-list"></i> <strong>Notes:</strong> {this.notes}</p> : null}
      </div>
      <span className="delete-dest" onclick={ e => { this.onDelete(this); }}><i className="fas fa-times"></i></span>
    </>);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.appendChild(<div className="loader"></div>);
      this.fetchOnlineInfo().then(() => {
        this.fetchStaticContent();
        this.render();
        this.rendered = true;
      });
    }
  }
}

customElements.define('trip-destination', Destination);
