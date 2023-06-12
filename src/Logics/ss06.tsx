import SampleSize06Service from './Services/SampleSize06Service';
import SampleSize06Request from './Interfaces/Request/SampleSize06Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize06Caculation(json: SampleSize06Request) {
  return SampleSize06Service.calculate(json);
}

function checkValidate(obj: SampleSize06Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize06Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize06Caculation(json);
  }
  return isValid;
}
export default calculate;
