import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize07Request from '../Interfaces/Request/SampleSize07Request';
import Helper from '../Ultil/Helper';
var z = 1.96;

function calculate(t: SampleSize07Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize07Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  z = Helper.genZ(t.conf);
  var d, n_ssu, n_psu, warning_text;
  var result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4;

  d = 1 + (t.b - 1) * t.rho;
  n_ssu = Helper.roundUp(
    (Math.pow(z, 2) * t.Py * (1 - t.Py) * d) / Math.pow(t.epsilon_a, 2),
    0,
  );
  n_psu = Helper.roundUp(n_ssu / t.b, 0);
  warning_text =
    'The calculated number of PSUs is ' +
    n_psu +
    '. At least 25 PSUs are recommended for one-stage cluster sampling designs.';

  result1 =
    'Number of PSUs to test to be ' +
    t.conf * 100 +
    '% confident sample prevalence is is within ' +
    t.epsilon_a +
    ' units of the population prevalence:';
  result1Value = Helper.roundNum(n_ssu, t.decPlaces);
  result2 = 'Number of SSUs to test if ' + t.b + ' PSUs tested per SSU:';
  result2Value = Helper.roundNum(n_psu, t.decPlaces);
  result3 = 'Design effect:';
  result3Value = Helper.roundNum(d, t.decPlaces);
  result4 = warning_text;

  response.data = {
    result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
  };
  return response;
}

export default { calculate };
