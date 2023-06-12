import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize01Request from '../Interfaces/Request/SampleSize01Request';
import Helper from '../Ultil/Helper';
var z = 1.96;

function calculate(t: SampleSize01Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  z = Helper.genZ(t.conf);
  var n_crude, d, n_adj, n_report, d_report;
  var result1, result1Value, result2, result2Value;

  n_crude = (Math.pow(z, 2) * (1 - t.Py) * t.Py) / Math.pow(t.epsilon_a, 2);
  d = t.rho * (t.b - 1) + 1;
  n_adj = Helper.roundUp(n_crude * d, 0);
  n_report = t.cluster == 'No' ? Helper.roundUp(n_crude, 0) : n_adj;
  d_report = t.cluster == 'No' ? 1 : d;

  result1 =
    'Number to test to be ' +
    t.conf * 100 +
    '% confident sample prevalence is within ' +
    t.epsilon_a +
    ' of the population prevalence:';
  result1Value = Helper.roundNum(n_report, t.decPlaces);
  result2 = 'Design effect:';
  result2Value = Helper.roundNum(d_report, t.decPlaces);

  response.data = { result1, result1Value, result2, result2Value };
  return response;
}

export default { calculate };
