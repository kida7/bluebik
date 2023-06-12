import BaseResponse from '../Interfaces/BaseResponse';
import DiagnosticX03Request from '../Interfaces/Request/DiagnosticX03Request';
import Helper from '../Ultil/Helper';

function calculate(t: DiagnosticX03Request) {
  return doCalculation(t);
}

function doCalculation(t: DiagnosticX03Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var sei_series,
    spi_series,
    sed_series,
    spd_series,
    sei_parallel,
    spi_parallel,
    sed_parallel,
    spd_parallel,
    sei,
    spi,
    sed,
    spd;
  var result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value,
    result5,
    result5Value;

  sei_series = t.se1 * t.se2;
  spi_series = t.sp1 + t.sp2 - t.sp1 * t.sp2;
  sed_series = t.se1 * t.se2 + t.covar1;
  spd_series = 1 - (1 - t.sp1) * (1 - t.sp2) - t.covar2;
  sei_parallel = t.se1 + t.se2 - t.se1 * t.se2;
  spi_parallel = t.sp1 * t.sp2;
  sed_parallel = 1 - (1 - t.se1) * (1 - t.se2) - t.covar1;
  spd_parallel = t.sp1 * t.sp2 + t.covar2;
  sei = t.interp == 'Series' ? sei_series : sei_parallel;
  spi = t.interp == 'Series' ? spi_series : spi_parallel;
  sed = t.interp == 'Series' ? sed_series : sed_parallel;
  spd = t.interp == 'Series' ? spd_series : spd_parallel;

  result1 = 'Interpretation:';
  result1Value = t.interp;
  result2 = 'Sensitivity assuming independence:';
  result2Value = Helper.roundNum(sei, 3);
  result3 = 'Specificity assuming independence:';
  result3Value = Helper.roundNum(spi, 3);
  result4 = 'Sensitivity assuming dependence:';
  result4Value = Helper.roundNum(sed, 3);
  result5 = 'Specificity assuming dependence:';
  result5Value = Helper.roundNum(spd, 3);

  response.data = {
    result1,
    result1Value,
    result2,
    result2Value,
    result3,
    result3Value,
    result4,
    result4Value,
    result5,
    result5Value,
  };
  return response;
}

export default { calculate };
