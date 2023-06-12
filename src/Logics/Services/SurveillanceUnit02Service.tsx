import BaseResponse from '../Interfaces/BaseResponse';
import SurveillanceUnit02Request from '../Interfaces/Request/SurveillanceUnit02Request';
import Helper from '../Ultil/Helper';

function calculate(t: SurveillanceUnit02Request) {
  return doCalculation(t);
}

function doCalculation(t: SurveillanceUnit02Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var se_p, interp;
  var result1 = '';

  se_p = 1 - Math.exp(t.pstar * (t.N * Math.log(1 - (t.se_u * t.n) / t.N)));
  interp =
    'If ' +
    t.n +
    ' surveillance units from a population of size ' +
    t.N +
    ' have been tested using a test with diagnostic sensitivity ' +
    t.se_u +
    ' and all have returned a negative result we can be ' +
    Helper.roundNum(se_p, 3) +
    ' certain that if disease is present in the population it is present at a prevalence of ' +
    t.pstar +
    ' or less.';
  result1 = interp;
  response.data = { result1 };
  return response;
}

export default { calculate };
