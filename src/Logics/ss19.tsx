import SampleSize19Service from './Services/SampleSize19Service';
import SampleSize19Request from './Interfaces/Request/SampleSize19Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function sampleSize19Caculation(json: SampleSize19Request) {
  return SampleSize19Service.calculate(json);
}

function checkValidate(obj: SampleSize19Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: SampleSize19Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return sampleSize19Caculation(json);
  }
  return isValid;
}
export default calculate;
