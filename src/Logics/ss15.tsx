import SampleSize15Service from './Services/SampleSize15Service';
import SampleSize15Request from './Interfaces/Request/SampleSize15Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize15Caculation(json: SampleSize15Request) {
  return SampleSize15Service.calculate(json);
}

function checkValidate(obj: SampleSize15Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize15Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize15Caculation(json);
  }
  return isValid;
}
export default calculate;
