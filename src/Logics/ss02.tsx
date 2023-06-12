import SampleSize02Service from './Services/SampleSize02Service';
import SampleSize02Request from './Interfaces/Request/SampleSize02Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize02Caculation(json: SampleSize02Request) {
  return SampleSize02Service.calculate(json);
}

function checkValidate(obj: SampleSize02Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize02Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize02Caculation(json);
  }
  return isValid;
}
export default calculate;
