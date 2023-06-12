import SampleSize05Service from './Services/SampleSize05Service';
import SampleSize05Request from './Interfaces/Request/SampleSize05Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize05Caculation(json: SampleSize05Request) {
  return SampleSize05Service.calculate(json);
}

function checkValidate(obj: SampleSize05Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize05Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize05Caculation(json);
  }
  return isValid;
}
export default calculate;
