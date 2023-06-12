import SampleSize12Service from './Services/SampleSize12Service';
import SampleSize12Request from './Interfaces/Request/SampleSize12Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize12Caculation(json: SampleSize12Request) {
  return SampleSize12Service.calculate(json);
}

function checkValidate(obj: SampleSize12Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize12Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize12Caculation(json);
  }
  return isValid;
}
export default calculate;
