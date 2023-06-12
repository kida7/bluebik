import SampleSize20Service from './Services/SampleSize20Service';
import SampleSize20Request from './Interfaces/Request/SampleSize20Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize20Caculation(json: SampleSize20Request) {
  return SampleSize20Service.calculate(json);
}

function checkValidate(obj: SampleSize20Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize20Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize20Caculation(json);
  }
  return isValid;
}
export default calculate;
