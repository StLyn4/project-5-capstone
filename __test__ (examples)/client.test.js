import 'regenerator-runtime/runtime';
import buildTable from '../src/client/js/tableBuilder';
import evs from '../src/client/js/eventFuncs';

const fakeData = {
  score_tag: 'N',
  agreement: 'AGREEMENT',
  confidence: 100,
  sentence_list: [
    {
      text: 'TEST',
      score_tag: 'N',
      agreement: 'AGREEMENT',
      confidence: 100,
      segment_list: [
        {
          text: 'TEST',
          score_tag: 'N',
          agreement: 'AGREEMENT',
          confidence: 100,
        }
      ]
    }
  ]
};

describe('Testing the client functionality', () => {
  test('Testing the buildTable() function', () => {
    expect(buildTable).toBeDefined();
    expect(buildTable(fakeData)).toMatch(/(<tr[^>]*>(?:.|\n)*?<\/tr>)/);
  });
  test('Testing events', () => {
    expect(evs.onInputBlur).toBeDefined();
    expect(evs.onInputFocus).toBeDefined();
    expect(evs.onButtonClick).toBeDefined();
  });
});
