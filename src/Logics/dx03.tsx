import DiagnosticX03Service from './Services/DiagnosticX03Service';
import DiagnosticX03Request from './Interfaces/Request/DiagnosticX03Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function diagnosticX03Caculation(json: DiagnosticX03Request) {
  return DiagnosticX03Service.calculate(json);
}

function checkValidate(obj: DiagnosticX03Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: DiagnosticX03Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return diagnosticX03Caculation(json);
  }
  return isValid;
}
export default calculate;
