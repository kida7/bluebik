import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize19Request from '../Interfaces/Request/SampleSize19Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize19Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize19Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var z_alpha, beta, z_beta, nb, na, n_total;
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

  z_alpha = Helper.NormSInv(1 - t.alpha);
  beta = 1 - t.power;
  z_beta = Helper.NormSInv(1 - beta);
  nb = Helper.roundUp(
    (1 + 1 / t.r) *
      Math.pow((t.sd * (z_alpha + z_beta)) / (t.ca - t.cb - t.delta), 2),
    0,
  );
  na = nb * t.r;
  n_total = na + nb;
  result1 = 'Total number of study subjects:';
  result1Value = Helper.roundNum(n_total, t.decPlaces);
  result2 = 'Total number in treatment group:';
  result2Value = Helper.roundNum(na, t.decPlaces);
  result3 = 'Total number in control group:';
  result3Value = Helper.roundNum(nb, t.decPlaces);
  result4 = 'Power:';
  result4Value = t.power;
  result5 = 'Equivalence limit:';
  result5Value = t.delta;

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
