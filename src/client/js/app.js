// Main JS file
import axios from 'axios';
// JSX. It is a pity that this is not a course on React :(
import {createJSXElement} from './jsx-runtime';
import './components/Plan';
import inputForm from './components/input'             // ------------------
import newDest from './components/input/newDest';      //    Input forms
import newPlan from './components/input/newPlan';      // ------------------
// If I can't use someone else's snowflakes, then just comment out the line below :)
import './snowfall'; // Just why no? It's nice

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.warn('Error detected: ' + error);
  return Promise.reject(error);
});

const plans = document.getElementById('plans'); // Place in real DOM
const plansList = []; // Copy in JS runtime (closing time is very important)

window.parseList = (raw, placeholder = []) => {
  const todoRaw = raw.replace(/\n\s*\n/g, '\n');
  return todoRaw ? todoRaw.split('\n') : placeholder;
};

// Load plans from the last session, if there are saves
const lastSession = window.localStorage.getItem('LastSession');
if (lastSession) {
  for (let [planName, destsDataRaw] of JSON.parse(lastSession)) {
    // The data is raw because the time is represented by a string
    const destsData = destsDataRaw.map(destData => {
      return {
        dest: destData.dest,
        departing: new Date(destData.departing),
        end: new Date(destData.end),
        flight: destData.flight,
        lodg: destData.lodg,
        todo: destData.todo,
        notes: destData.notes
      };
    });
    // Create a plan with destinations and mount it in the DOM
    // as in the usual creation of a new plan
    const plan = (<trip-plan
      name={planName}
      destsData={destsData}
    />);
    plans.appendChild(plan);
    plansList.push(plan);
  }
}

for (let newPlanBtn of Array.from(document.getElementsByClassName('add-plan-btn'))) {
  // When you click on the create plan button
  newPlanBtn.addEventListener('click', e => {
    // Form is created where you need to enter a name for the plan
    inputForm(newPlan, (result, form) => {
      const planName = result.name;
      form.remove();

      // After that a new, more detailed form is created
      inputForm(newDest, (result, form) => {
        form.remove();

        const destsData = [{
          dest: result.dest,
          departing: new Date(`${result.depDate} ${result.depTime}`),
          end: new Date(`${result.endDate} ${result.endTime}`),
          flight: {from: result.flightFrom, to: result.flightTo},
          lodg: window.parseList(result.lodg),
          todo: window.parseList(result.todo, ['Do nothing']),
          notes: result.notes || null
        }];

        // Based on the data received from the user, a plan and first destination are created
        const plan = (<trip-plan
          name={planName}
          destsData={destsData}
        />);
        plans.appendChild(plan);
        plansList.push(plan);
      }, '#inputForm');

    }, '#inputForm')
  });
}

window.addEventListener('beforeunload', e => { // Save plans when the page closes
  const session = []; // Objects are not suitable because plans may have the same name
  let i = 0;
  for (let plan of plansList) {
    if (!plan.unmounted) {
      session[i++] = [plan.name, plan.dests.map(dest => {
        return {
          dest: dest.dest,
          departing: dest.departing,
          end: dest.end,
          flight: dest.flight,
          lodg: dest.lodg,
          todo: dest.todo,
          notes: dest.notes
        };
      })];
    }
  }
  window.localStorage.setItem('LastSession', JSON.stringify(session));
});
