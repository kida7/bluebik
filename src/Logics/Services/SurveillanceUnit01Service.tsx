import BaseResponse from '../Interfaces/BaseResponse';
import SurveillanceUnit01Request from '../Interfaces/Request/SurveillanceUnit01Request';
import Helper from '../Ultil/Helper';

function calculate(t: SurveillanceUnit01Request) {
  return doCalculation(t);
}

function doCalculation(t: SurveillanceUnit01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var pstar_k, pstar_u, interp_k, interp_u;
  var result1 = '';

  pstar_k = Math.log(1 - t.se_p) / Math.log(1 - (t.se_u * t.n) / t.N) / t.N;
  pstar_u = (1 - Math.exp(Math.log(1 - t.se_u) / t.n)) / t.se_u;
  interp_k =
    'If ' +
    t.n +
    ' surveillance units have been tested from a population of ' +
    t.N +
    ' and all have returned a negative test result using a test with ' +
    t.se_u +
    ' diagnostic sensitivity we can be ' +
    Helper.roundNum(t.se_u * 100, 0) +
    '% confident that disease,if it is present in the population, is present at a prevalence of ' +
    Helper.roundNum(t.N > 0 ? pstar_k : pstar_u, 3) +
    ' or less.';
  interp_u =
    'If ' +
    t.n +
    ' surveillance units have been tested from a population of unlimited size and all have returned a negative test result using a test with ' +
    t.se_u +
    ' diagnostic sensitivity we can be ' +
    Helper.roundNum(t.se_p * 100, 0) +
    '% confident that disease,if it is present in the population, is present at a prevalence of ' +
    Helper.roundNum(t.N > 0 ? pstar_k : pstar_u, 3) +
    ' or less.';
  result1 = t.N > 0 ? interp_k : interp_u;

  response.data = { result1 };
  return response;
}

export default { calculate };
