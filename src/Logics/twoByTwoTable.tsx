import TwoByTwoTableService from './Services/TwoByTwoTableService';
import BaseResponse from './Interfaces/BaseResponse';
import TwoByTwoTableRequest from './Interfaces/Request/TwoByTwoTableRequest';
/*CONST DECLARE */

//sample Est A Mean js
function twoByTwoTableCaculation(json: TwoByTwoTableRequest) {
  return TwoByTwoTableService.calculate(json);
}

function checkValidate(obj: TwoByTwoTableRequest) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  if (!obj.type) {
    response.success = false;
    response.message = 'Type cannot be empty';
  } else if (!obj.typeAnaly) {
    response.success = false;
    response.message = 'Type cannot be empty';
  }

  return response;
}

function calculate(json: TwoByTwoTableRequest) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return twoByTwoTableCaculation(json);
  }
  return isValid;
}
export default calculate;
