import BaseResponse from '../Interfaces/BaseResponse';
import SampleSize22Request from '../Interfaces/Request/SampleSize22Request';
import Helper from '../Ultil/Helper';

function calculate(t: SampleSize22Request) {
  return doCalculation(t);
}

function doCalculation(t: SampleSize22Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var alpha,
    n_crude,
    n_crude_adjse,
    n_crude_fpos,
    n_fcf,
    n_fpc_adjse,
    n_fpc_fpos,
    rval_n,
    rval_nse,
    rval_fp;
  var result1, result1Value, result2, result2Value, result3, result3Value;

  alpha = 1 - t.conf;
  n_crude =
    (1 - Math.pow(alpha, 1 / (t.N * t.pstar * t.se_u))) *
    (t.N - (t.N * t.pstar * t.se_u - 1) / 2);
  n_crude_adjse = n_crude * (1 / t.se_u);
  n_crude_fpos = (1 - t.pstar) * (1 - t.sp_u) * n_crude;
  n_fcf = n_crude / (1 + n_crude / t.N);
  n_fpc_adjse = n_fcf * (1 / t.se_u);
  n_fpc_fpos = (1 - t.pstar) * (1 - t.sp_u) * n_fpc_adjse;
  rval_n = t.fc == 1 ? n_fcf : n_crude;
  rval_nse = t.fc == 1 ? n_fpc_adjse : n_crude_adjse;
  rval_fp = t.fc == 1 ? n_fpc_fpos : n_crude_fpos;

  result1 =
    'Number of subjects to test to be ' +
    t.conf * 100 +
    '% confident of detecting disease with a perfect test:';
  result1Value = Helper.roundNum(rval_n, t.decPlaces);
  result2 =
    "If the test you're using has a sensitivity of " +
    t.conf +
    ' then the number tested should be increased to:';
  result2Value = Helper.roundNum(rval_nse, t.decPlaces);
  result3 =
    'Approximate number of false positives expected if sample size adjusted for test sensitivity:';
  result3Value = Helper.roundNum(rval_fp, t.decPlaces);

  response.data = {
    result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
  };
  return response;
}

export default { calculate };
