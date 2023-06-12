import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize20Request from '../Interfaces/Request/SampleSize20Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize20Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize20Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var z_alpha,
    beta,
    z_beta,
    ndelta,
    signz,
    signp,
    solution,
    nb,
    na,
    n_total,
    nb_report,
    na_report,
    n_total_report;
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
  ndelta = -t.delta;
  signz = Math.sign(z_alpha + z_beta);
  signp = Math.sign(t.pa - t.pb - ndelta);
  solution = signz != signp ? 0 : 1;
  nb = Helper.roundUp(
    ((t.pa * (1 - t.pa)) / t.r + t.pb * (1 - t.pb)) *
      Math.pow((z_alpha + z_beta) / (t.pa - t.pb - ndelta), 2),
    0,
  );
  na = nb * t.r;
  n_total = na + nb;
  nb_report = nb;
  na_report = na;
  n_total_report = n_total;
  result1 = 'Total number of study subjects:';
  result1Value =
    solution == 1
      ? Helper.roundNum(n_total_report, t.decPlaces)
      : 'Target power is not reachable. Check the exact specification of the hypotheses.';
  result2 = 'Total number in treatment group:';
  result2Value =
    solution == 1
      ? Helper.roundNum(na_report, t.decPlaces)
      : 'Target power is not reachable. Check the exact specification of the hypotheses.';
  result3 = 'Total number in control group:';
  result3Value =
    solution == 1
      ? Helper.roundNum(nb_report, t.decPlaces)
      : 'Target power is not reachable. Check the exact specification of the hypotheses.';
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
