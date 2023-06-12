import SurveillanceUnit01Service from './Services/SurveillanceUnit01Service';
import SurveillanceUnit01Request from './Interfaces/Request/SurveillanceUnit01Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function surveillanceUnit01Caculation(json: SurveillanceUnit01Request) {
  return SurveillanceUnit01Service.calculate(json);
}

function checkValidate(obj: SurveillanceUnit01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SurveillanceUnit01Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return surveillanceUnit01Caculation(json);
  }
  return isValid;
}
export default calculate;
