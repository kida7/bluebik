import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize11Request from '../Interfaces/Request/SampleSize11Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize11Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize11Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    z_alpha,
    z_beta,
    lambda,
    irr,
    flambda1,
    flambda0,
    flambda,
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
  lambda = Helper.arrayAverage(new Array(t.lambda1, t.lambda0));
  irr = t.lambda1 / t.lambda0;
  flambda1 =
    (Math.pow(t.lambda1, 3) * t.FT) /
    (t.lambda1 * t.FT - 1 + Math.exp(-t.lambda1 * t.FT));
  flambda0 =
    (Math.pow(t.lambda0, 3) * t.FT) /
    (t.lambda0 * t.FT - 1 + Math.exp(-t.lambda0 * t.FT));
  flambda =
    (Math.pow(lambda, 3) * t.FT) /
    (lambda * t.FT - 1 + Math.exp(-lambda * t.FT));
  n_exp1 =
    t.FT > 0
      ? (Math.pow(
          z_alpha * Math.sqrt((1 + t.r) * flambda) +
            z_beta * Math.sqrt(t.r * flambda1 + flambda0),
          2,
        ) /
          (t.r * Math.pow(t.lambda1 - t.lambda0, 2))) *
        t.design
      : Helper.roundUp(
          (Math.pow(
            z_alpha * Math.sqrt((1 + t.r) * Math.pow(lambda, 2)) +
              z_beta *
                Math.sqrt(
                  t.r * Math.pow(t.lambda1, 2) + Math.pow(t.lambda0, 2),
                ),
            2,
          ) /
            (t.r * Math.pow(t.lambda1 - t.lambda0, 2))) *
            t.design,
          0,
        );
  n_exp0 = t.r * n_exp1;
  n_total = n_exp0 + n_exp1;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number of subjects in the exposed group:';
  result2Value = Helper.roundNum(n_exp1, t.decPlaces);
  result3 = 'Total number of subjects in the unexposed group:';
  result3Value = Helper.roundNum(n_exp0, t.decPlaces);
  result4 = 'Power:';
  (result4Value = t.power), t.decPlaces;
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
