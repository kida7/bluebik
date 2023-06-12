import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize08Request from '../Interfaces/Request/SampleSize08Request';
import Helper from '../Ultil/Helper';
var z = 1.96;

function calculate(t: SampleSize08Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize08Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  z = Helper.genZ(t.conf);
  var d, vsq, epsilon_r, n_ssu, n_psu, warning_text;
  var result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4;

  d = 1 + (t.b - 1) * t.rho;
  vsq = Math.pow(t.xsigma, 2) / Math.pow(t.xbar, 2);
  epsilon_r = t.epsilon_a / t.xbar;
  n_ssu = Helper.roundUp(
    (Math.pow(z, 2) * t.N * vsq * d) /
      (Math.pow(z, 2) * vsq + (t.N - 1) * Math.pow(epsilon_r, 2)),
    0,
  );
  n_psu = Helper.roundUp(n_ssu / t.b, 0);
  warning_text =
    'The calculated number of PSUs is ' +
    n_psu +
    '. At least 25 PSUs are recommended for two-stage cluster sampling designs.';

  result1 = 'Number of PSUs to sample:';
  result1Value = Helper.roundNum(n_ssu, t.decPlaces);
  result2 = 'Number of SSUs to sample if ' + t.b + ' PSUs sampled per SSU:';
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
