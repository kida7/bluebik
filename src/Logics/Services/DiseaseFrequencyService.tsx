import BaseResponse from '../Interfaces/BaseResponse';
import DiseaseFrequencyRequest from '../Interfaces/Request/DiseaseFrequencyRequest';
import Helper from '../Ultil/Helper';
var z = 1.96;
const toText = 'to';

function calculate(t: DiseaseFrequencyRequest) {
  return doCalculation(t);
}

function genType(type: string) {
  var string = '';
  switch (type) {
    case 'irate':
      string = 'Incidence rate:';
      break;
    case 'irisk':
      string = 'Incidence risk:';
      break;
    case 'prev':
      string = 'Prevalence:';
      break;
  }
  return string;
}

function genDesc(type: string, a: number, b: number, c: number) {
  var string = '';
  switch (type) {
    case 'irate':
      string =
        'Number of events in a population of ' +
        a +
        ' consistent with an incidence rate of ' +
        b +
        ' event(s) per ' +
        c +
        ' unit(s) of subject time:';
      break;
    case 'irisk':
      string =
        'Number of events in a population of ' +
        a +
        ' consistent with an incidence risk of ' +
        b +
        ' event(s) per ' +
        c +
        ' subjects:';
      break;
    case 'prev':
      string =
        'Number of events in a population of ' +
        a +
        ' consistent with a prevalence of ' +
        b +
        ' event(s) per ' +
        c +
        ' subjects:';
      break;
  }
  return string;
}

function doCalculation(t: DiseaseFrequencyRequest) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  z = Helper.genZ(t.conf);
  var low;
  var up;
  var est;
  // var cases = (t.a / t.n) * t.mult;
  var CI = t.conf * 100;

  var result1 = '',
    result1Value = '',
    result2 = '',
    result2Value = '';

  if (t.type == 'irisk') {
    var aPrime = t.a + 0.5;
    est = (t.a / t.n) * t.mult;
    low =
      ((aPrime *
        Math.pow(1 - 1 / (9 * aPrime) - (z / 3) * Math.sqrt(1 / aPrime), 3)) /
        t.n) *
      t.mult;

    up =
      ((aPrime *
        Math.pow(1 - 1 / (9 * aPrime) + (z / 3) * Math.sqrt(1 / aPrime), 3)) /
        t.n) *
      t.mult;

    result1 = genType(t.type);
    result1Value =
      Math.round(est) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(low, 1) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(up, 1) +
      ') ';

    result2 = genDesc(t.type, t.n, est, t.mult);
    result2Value =
      Math.round((low / 100) * t.n) +
      ' ' +
      toText +
      ' ' +
      Math.round((up / 100) * t.n);
  } else {
    var a = t.n / (t.n + Math.pow(z, 2));
    var b = t.a / t.n;
    var c = (z * z) / (2 * t.n);
    var d = (t.a * (t.n - t.a)) / Math.pow(t.n, 3);
    var e = Math.pow(z, 2) / (4 * Math.pow(t.n, 2));
    est = b * t.mult;
    low = a * (b + c - z * Math.sqrt(d + e)) * t.mult;
    up = a * (b + c + z * Math.sqrt(d + e)) * t.mult;

    result1 = genType(t.type);
    result1Value =
      Math.round(est) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(low, 1) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(up, 1) +
      ') event(s) per ' +
      t.mult +
      ' ' +
      (t.type == 'irate' ? 'unit(s) subject time.' : 'subject(s).') +
      '';
    result2 = genDesc(t.type, t.n, est, t.mult);
    result2Value =
      Math.round((low / 100) * t.n) +
      ' ' +
      toText +
      ' ' +
      Math.round((up / 100) * t.n);
  }
  response.data = { result1, result1Value, result2, result2Value };
  return response;
}

export default { calculate };
