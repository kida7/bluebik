import SampleSize21Service from './Services/SampleSize21Service';
import SampleSize21Request from './Interfaces/Request/SampleSize21Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize21Caculation(json: SampleSize21Request) {
  return SampleSize21Service.calculate(json);
}

function checkValidate(obj: SampleSize21Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize21Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize21Caculation(json);
  }
  return isValid;
}
export default calculate;
