import DiagnosticX01Service from './Services/DiagnosticX01Service';
import DiagnosticX01Request from './Interfaces/Request/DiagnosticX01Request';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function diagnosticX01Caculation(json: DiagnosticX01Request) {
  return DiagnosticX01Service.calculate(json);
}

function checkValidate(obj: DiagnosticX01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  return response;
}

function calculate(json: DiagnosticX01Request) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return diagnosticX01Caculation(json);
  }
  return isValid;
}
export default calculate;
