import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize10Request from '../Interfaces/Request/SampleSize10Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize10Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize10Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    z_alpha,
    z_beta,
    lambda,
    irr,
    psi,
    pi,
    pc,
    p1,
    p2,
    p3,
    n0,
    n_exp1,
    n_exp0,
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
  lambda = t.irexp1 / t.irexp0;
  irr = t.irexp1 / t.irexp0;
  psi = t.irexp1 / (1 - t.irexp1) / (t.irexp0 / (1 - t.irexp0));
  pi = t.irexp0;
  pc = (pi * (t.r * lambda + 1)) / (t.r + 1);
  p1 = (t.r + 1) / (t.r * Math.pow(lambda - 1, 2) * Math.pow(pi, 2));
  p2 = z_alpha * Math.sqrt((t.r + 1) * pc * (1 - pc));
  p3 =
    z_beta * Math.sqrt(lambda * pi * (1 - lambda * pi) + t.r * pi * (1 - pi));
  n0 = p1 * Math.pow(p2 + p3, 2) * t.design;
  n_exp1 = Helper.roundUp((n0 / (t.r + 1)) * t.r, 0);
  n_exp0 = Helper.roundUp((n0 / (t.r + 1)) * 1, 0);
  n_total = n_exp0 + n_exp1;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number of subjects in the exposed group:';
  result2Value = Helper.roundNum(n_exp1, t.decPlaces);
  result3 = 'Total number of subjects in the unexposed group:';
  result3Value = Helper.roundNum(n_exp0, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;
  result5 = 'Incident rate ratio:';
  result5Value = Helper.roundNum(irr, t.decPlaces);

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
