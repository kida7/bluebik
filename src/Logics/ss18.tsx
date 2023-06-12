import SampleSize18Service from './Services/SampleSize18Service';
import SampleSize18Request from './Interfaces/Request/SampleSize18Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize18Caculation(json: SampleSize18Request) {
  return SampleSize18Service.calculate(json);
}

function checkValidate(obj: SampleSize18Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize18Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize18Caculation(json);
  }
  return isValid;
}
export default calculate;
