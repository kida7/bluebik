import DiseaseFrequencyService from './Services/DiseaseFrequencyService';
import DiseaseFrequencyRequest from './Interfaces/Request/DiseaseFrequencyRequest';
import BaseResponse from './Interfaces/BaseResponse';
/*CONST DECLARE */

//sample Est A Mean js
function diseaseFrequencyCaculation(json: DiseaseFrequencyRequest) {
  return DiseaseFrequencyService.calculate(json);
}

function checkValidate(obj: DiseaseFrequencyRequest) {
  var response: BaseResponse = { success: true, data: [], message: '' };

  if (!obj.type) {
    response.success = false;
    response.message = 'Type cannot be empty';
  }

  return response;
}

function calculate(json: DiseaseFrequencyRequest) {
  var isValid = checkValidate(json);
  if (isValid.success) {
    return diseaseFrequencyCaculation(json);
  }
  return isValid;
}
export default calculate;
