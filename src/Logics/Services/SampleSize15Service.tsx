import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize15Request from '../Interfaces/Request/SampleSize15Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize15Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize15Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha, z_alpha, z_beta, p, q, exp_beta, n, n_treat, n_control, n_total;
  var result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value;

  alpha = (1 - t.conf) / t.sided_test;
  z_alpha = Math.abs(Helper.NormSInv(1 - alpha));
  z_beta = Math.abs(Helper.NormSInv(1 - t.power));
  p = t.r / (t.r + 1);
  q = 1 - p;
  exp_beta = Math.log(t.treat) / Math.log(t.control);
  n = Math.pow(z_alpha + z_beta, 2) / (p * q * Math.pow(Math.log(exp_beta), 2));
  n_treat = Helper.roundUp((n / (1 + t.r)) * t.r, 0);
  n_control = Helper.roundUp((n / (1 + t.r)) * 1, 0);
  n_total = n_treat + n_control;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number in treatment group:';
  result2Value = Helper.roundNum(n_treat, t.decPlaces);
  result3 = 'Total number in control group:';
  result3Value = Helper.roundNum(n_control, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;

  response.data = {
    result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value,
  };
  return response;
}

export default { calculate };
