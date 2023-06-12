import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize09Request from '../Interfaces/Request/SampleSize09Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize09Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize09Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    z_alpha,
    z_beta,
    lambda,
    psi,
    pc,
    p1,
    p2,
    p3,
    n0,
    n,
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
    result5Value,
    result6,
    result6Value;

  alpha = (1 - t.conf) / t.sided_test;
  z_alpha = Helper.roundNum(Helper.NormSInv(1 - alpha), t.decPlaces);
  z_beta = Helper.roundNum(Helper.NormSInv(t.power), t.decPlaces);
  lambda = t.pdexp1 / t.pdexp0;
  psi = t.pdexp1 / (1 - t.pdexp1) / (t.pdexp0 / (1 - t.pdexp0));
  pc = (t.pdexp0 * (t.r * lambda + 1)) / (t.r + 1);
  p1 = (t.r + 1) / (t.r * Math.pow(lambda - 1, 2) * Math.pow(t.pdexp0, 2));
  p2 = z_alpha * Math.sqrt((t.r + 1) * pc * (1 - pc));
  p3 =
    z_beta *
    Math.sqrt(
      lambda * t.pdexp0 * (1 - lambda * t.pdexp0) +
        t.r * t.pdexp0 * (1 - t.pdexp0),
    );
  n0 = p1 * Math.pow(p2 + p3, 2) * t.design;
  n = t.fc == 1 ? (n0 * t.N) / (n0 + (t.N - 1)) : n0;
  n_exp1 = Helper.roundUp((n / (t.r + 1)) * t.r, 0);
  n_exp0 = Helper.roundUp((n / (t.r + 1)) * 1, 0);
  n_total = n_exp0 + n_exp1;

  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number of subjects in the exposed group:';
  result2Value = Helper.roundNum(n_exp1, t.decPlaces);
  result3 = 'Total number of subjects in the unexposed group:';
  result3Value = Helper.roundNum(n_exp0, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;
  result5 = 'Prevalence ratio:';
  result5Value = Helper.roundNum(lambda, t.decPlaces);
  result6 = 'Odds ratio:';
  result6Value = Helper.roundNum(psi, t.decPlaces);

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
    result6,
    result6Value,
  };
  return response;
}

export default { calculate };
