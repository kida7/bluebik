import SampleSize13Service from './Services/SampleSize13Service';
import SampleSize13Request from './Interfaces/Request/SampleSize13Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize13Caculation(json: SampleSize13Request) {
  return SampleSize13Service.calculate(json);
}

function checkValidate(obj: SampleSize13Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize13Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize13Caculation(json);
  }
  return isValid;
}
export default calculate;
