import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize12Request from '../Interfaces/Request/SampleSize12Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize12Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize12Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    z_alpha,
    z_beta,
    pc,
    t1,
    t2,
    t3,
    t4,
    t5,
    t6,
    t7,
    t8,
    d,
    n_,
    n,
    n_case,
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
  pc = (t.p0 / (t.r + 1)) * ((t.r * t.OR) / (1 + (t.OR - 1) * t.p0) + 1);
  t1 = (t.r + 1) * Math.pow(1 + (t.OR - 1) * t.p0, 2);
  t2 = t.r * Math.pow(t.p0, 2) * Math.pow(t.p0 - 1, 2) * Math.pow(t.OR - 1, 2);
  t3 = z_alpha * Math.sqrt((t.r + 1) * pc * (1 - pc));
  t4 = t.OR * t.p0 * (1 - t.p0);
  t5 = 1 + (t.OR - 1) * t.p0;
  t6 = t4 / Math.pow(t5, 2);
  t7 = t.r * t.p0 * (1 - t.p0);
  t8 = z_beta * Math.sqrt(t6 + t7);
  n_ = (t1 / t2) * Math.pow(t3 + t8, 2);
  d = 1 + (2 * (t.r + 1)) / (n_ * t.r * Math.abs(t.p0 - t.p1));
  n = t.fleiss == 1 ? (n_ / 4) * Math.pow(1 + Math.sqrt(d), 2) : n_;
  n_case = Helper.roundUp(n / (1 + t.r), 0);
  n_control = Helper.roundUp(t.r * n_case, 0);
  n_total = n_case + n_control;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number of cases:';
  result2Value = Helper.roundNum(n_case, t.decPlaces);
  result3 = 'Total number of controls:';
  result3Value = Helper.roundNum(n_control, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;
  result5 = 'Minimum detectable odds ratio:';
  result5Value = t.OR;

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
