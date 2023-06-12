import SampleSize09Service from './Services/SampleSize09Service';
import SampleSize09Request from './Interfaces/Request/SampleSize09Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize09Caculation(json: SampleSize09Request) {
  return SampleSize09Service.calculate(json);
}

function checkValidate(obj: SampleSize09Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize09Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize09Caculation(json);
  }
  return isValid;
}
export default calculate;
