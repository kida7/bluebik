import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize13Request from '../Interfaces/Request/SampleSize13Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize13Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize13Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    z_alpha,
    z_beta,
    lambda,
    pc,
    t1,
    t2,
    t3,
    n,
    n_treat,
    n_control,
    n_total;
  var result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value,
    result5,
    result5Value;

  alpha = (1 - t.conf) / t.sided_test;
  z_alpha = Math.abs(Helper.NormSInv(1 - alpha));
  z_beta = Math.abs(Helper.NormSInv(1 - t.power));
  lambda = t.treat / t.control;
  pc = (t.control * (t.r * lambda + 1)) / (t.r + 1);
  t1 = (t.r + 1) / (t.r * Math.pow(lambda - 1, 2) * Math.pow(t.control, 2));
  t2 = (t.r + 1) * pc * (1 - pc);
  t3 =
    lambda * t.control * (1 - lambda * t.control) +
    t.r * t.control * (1 - t.control);
  n = t1 * Math.pow(z_alpha * Math.sqrt(t2) + z_beta * Math.sqrt(t3), 2);
  n_treat = Helper.roundUp(n / (1 + t.r), 0);
  n_control = t.r * n_treat;
  n_total = n_treat + n_control;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number in treatment group:';
  result2Value = Helper.roundNum(n_treat, t.decPlaces);
  result3 = 'Total number in control group:';
  result3Value = Helper.roundNum(n_control, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;
  result5 = 'Lambda:';
  result5Value = Helper.roundNum(lambda, t.decPlaces);

  response.data = {
    result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value,
    result5,
    result5Value,
  };
  return response;
}

export default { calculate };
