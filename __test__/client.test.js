import {createJSXElement} from '../src/client/js/jsx-runtime';
import inputForm from '../src/client/js/components/input';
import wrapper from '../src/client/js/components/input/wrapper';
import newDest from '../src/client/js/components/input/newDest';
import newPlan from '../src/client/js/components/input/newPlan';
import destInfo from '../src/client/js/components/input/destInfo';
import '../src/client/js/components/Plan';

describe('Testing the client functionality', () => {
  test('Testing the JSX functionality', () => {
    expect((<div>test</div>) instanceof HTMLDivElement).toBeTruthy();
    expect((<><p>test1</p><p>test2</p></>) instanceof DocumentFragment).toBeTruthy();
  });
  test('Checking the availability of input forms', () => {
    expect(inputForm).toBeDefined();
    expect(wrapper).toBeDefined();
    expect(newDest).toBeDefined();
    expect(newPlan).toBeDefined();
    expect(destInfo).toBeDefined();
  });
  test('Check if custom elements are registered', () => {
    expect(customElements.get('trip-plan')).toBeDefined();
    expect(customElements.get('trip-destination')).toBeDefined();
  });
});
