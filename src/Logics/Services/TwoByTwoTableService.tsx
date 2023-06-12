import BaseResponse from '../Interfaces/BaseResponse';
import TwoByTwoTableRequest from '../Interfaces/Request/TwoByTwoTableRequest';
import Helper from '../Ultil/Helper';
var z = 1.96;
const toText = 'to';

function calculate(t: TwoByTwoTableRequest) {
  return doCalculation(t);
}

function doCalculation(t: TwoByTwoTableRequest) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  z = Helper.genZ(t.conf);
  var CI = t.conf * 100;
  var result = '',
    resultValue = '';
  if (
    t.typeAnaly == 'cCount' ||
    t.typeAnaly == 'cTime' ||
    t.typeAnaly == 'caStudy'
  ) {
    var rrp, inrr, inrrvar, inrrse, inrrl, inrru, rrse, rrl, rru;
    rrp = t.a / (t.a + t.b) / (t.c / (t.c + t.d));
    inrr = Math.log(rrp);
    inrrvar = 1 / t.a - (1 / (t.a + t.b) + 1 / t.c - 1 / (t.c + t.d));
    inrrse = Math.sqrt(1 / t.a - (1 / (t.a + t.b) + 1 / t.c - 1 / (t.c + t.d)));
    inrrl = inrr - z * inrrse;
    inrru = inrr + z * inrrse;
    rrse = Math.exp(inrrse);
    rrl = Math.exp(inrrl);
    rru = Math.exp(inrru);

    var orp, inor, inorvar, inorse, inorl, inoru, orse, orl, oru;
    orp = (t.a * t.d) / (t.b * t.c);
    inor = Math.log(orp);
    inorvar = 1 / t.a + 1 / t.b + 1 / t.c + 1 / t.d;
    inorse = Math.sqrt(1 / t.a + 1 / t.b + 1 / t.c + 1 / t.d);
    inorl = inor - z * inorse;
    inoru = inor + z * inorse;
    orse = Math.exp(inorse);
    orl = Math.exp(inorl);
    oru = Math.exp(inoru);
    if (t.type == 'ratio') {
      result =
        t.typeAnaly == 'cCount' ? 'Incidence risk ratio:' : 'Prevalence ratio:';
      resultValue =
        Helper.roundNum(rrp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(rrl, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(rru, t.decPlaces) +
        ') ';
    } else if (t.type == 'odd') {
      result = 'Odds ratio:';
      resultValue =
        Helper.roundNum(orp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(orl, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(oru, t.decPlaces) +
        ') ';
    } else if (t.type == 'aat') {
      var ariskp, ariskse, ariskl, arisku;
      ariskp = t.a / (t.a + t.b) - t.c / (t.c + t.d);
      ariskse = Math.sqrt(
        (t.a * (t.a + t.b - t.a)) / Math.pow(t.a + t.b, 3) +
          (t.c * (t.c + t.d - t.c)) / Math.pow(t.c + t.d, 3),
      );
      ariskl = ariskp - z * ariskse;
      arisku = ariskp + z * ariskse;
      result =
        t.typeAnaly == 'cCount'
          ? 'Attributable risk:'
          : 'Attributable prevalence:';
      resultValue =
        Helper.roundNum(ariskp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(ariskl, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(arisku, t.decPlaces) +
        ') ';
    } else if (t.type == 'attPop') {
      var pariskp, pariskse, pariskl, parisku;
      pariskp = (t.a + t.c) / (t.a + t.b + t.c + t.d) - t.c / (t.c + t.d);
      pariskse = Math.sqrt(
        ((t.a + t.c) * (t.b + t.d)) / Math.pow(t.a + t.b + t.c + t.d, 3) +
          (t.c * t.d) / Math.pow(t.c + t.d, 3),
      );
      pariskl = pariskp - z * pariskse;
      parisku = pariskp + z * pariskse;
      result =
        t.typeAnaly == 'cCount'
          ? 'Attributable risk in population:'
          : 'Attributable prevalence in population:';
      resultValue =
        Helper.roundNum(pariskp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(pariskl, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(parisku, t.decPlaces) +
        ') ';
    } else if (t.type == 'attFracExp') {
      if (t.typeAnaly == 'cCount' || t.typeAnaly == 'cTime') {
        var afriskp, afriskl, afrisku;
        afriskp = (rrp - 1) / rrp;
        afriskl = Math.min((rrl - 1) / rrl, (rru - 1) / rru);
        afrisku = Math.max((rrl - 1) / rrl, (rru - 1) / rru);
        result = 'Attributable fraction in exposed:';
        resultValue =
          Helper.roundNum(afriskp, t.decPlaces) +
          ' (' +
          Math.round(CI) +
          '% CI ' +
          Helper.roundNum(afriskl, t.decPlaces) +
          ' ' +
          toText +
          ' ' +
          Helper.roundNum(afrisku, t.decPlaces) +
          ') ';
      } else {
        var afestp, afestl, afestu;
        afestp = (orp - 1) / orp;
        afestl = Math.min((orl - 1) / orl, (oru - 1) / oru);
        afestu = Math.max((orl - 1) / orl, (oru - 1) / oru);
        result = 'Attributable fraction (est) in exposed:';
        resultValue =
          Helper.roundNum(afestp, t.decPlaces) +
          ' (' +
          Math.round(CI) +
          '% CI ' +
          Helper.roundNum(afestl, t.decPlaces) +
          ' ' +
          toText +
          ' ' +
          Helper.roundNum(afestu, t.decPlaces) +
          ') ';
      }
    } else if (t.type == 'attFracPop') {
      if (t.typeAnaly == 'cCount' || t.typeAnaly == 'cTime') {
        var pafriskp, pafriskvar, pafriskl, pafrisku;
        pafriskp = (t.a * t.d - t.b * t.c) / ((t.a + t.c) * (t.c + t.d));
        pafriskvar =
          (t.b + pafriskp * (t.a + t.d)) / ((t.a + t.b + t.c + t.d) * t.c);
        pafriskl =
          1 - Math.exp(Math.log(1 - pafriskp) + z * Math.sqrt(pafriskvar));
        pafrisku =
          1 - Math.exp(Math.log(1 - pafriskp) - z * Math.sqrt(pafriskvar));
        result = 'Attributable fraction in population:';
        resultValue =
          Helper.roundNum(pafriskp, t.decPlaces) +
          ' (' +
          Math.round(CI) +
          '% CI ' +
          Helper.roundNum(pafriskl, t.decPlaces) +
          ' ' +
          toText +
          ' ' +
          Helper.roundNum(pafrisku, t.decPlaces) +
          ') ';
      } else {
        var pafestp, pafestvar, pafestl, pafestu;
        pafestp = (t.a * t.d - t.b * t.c) / (t.d * (t.a + t.c));
        pafestvar = t.a / (t.c * (t.a + t.c)) + t.b / (t.d * (t.b + t.d));
        pafestl =
          1 - Math.exp(Math.log(1 - pafestp) + z * Math.sqrt(pafestvar));
        pafestu =
          1 - Math.exp(Math.log(1 - pafestp) - z * Math.sqrt(pafestvar));
        result = 'Attributable fraction (est) in population:';
        resultValue =
          Helper.roundNum(pafestp, t.decPlaces) +
          ' (' +
          Math.round(CI) +
          '% CI ' +
          Helper.roundNum(pafestl, t.decPlaces) +
          ' ' +
          toText +
          ' ' +
          Helper.roundNum(pafestu, t.decPlaces) +
          ') ';
      }
    } else {
      response.success = false;
      response.message = 'Không có dữ liệu phù hợp';
      return response;
    }
  } else {
    var irrp, inirr, inirrvar, inirrse, irrse, inirrl, inirru, irrl, irru;
    irrp = t.a / t.b / (t.c / t.d);
    inirr = Math.log(irrp);
    inirrvar = 1 / t.a + 1 / t.c;
    inirrse = Math.sqrt(1 / t.a + 1 / t.c);
    irrse = Math.exp(inirrse);
    inirrl = inirr - z * inirrse;
    inirru = inirr + z * inirrse;
    irrl = Math.exp(inirrl);
    irru = Math.exp(inirru);
    if (t.type == 'ratio') {
      result = 'Incidence rate ratio:';
      resultValue =
        Helper.roundNum(irrp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(irrl, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(irru, t.decPlaces) +
        ') ';
    } else if (t.type == 'aat') {
      var aratep, aratevar, aratese, aratel, arateu;
      aratep = t.a / t.b - t.c / t.d;
      aratevar = t.a / Math.pow(t.b, 2) + t.c / Math.pow(t.d, 2);
      aratese = Math.sqrt(aratevar);
      aratel = aratep - z * aratese;
      arateu = aratep + z * aratese;
      result = 'Attributable rate:';
      resultValue =
        Helper.roundNum(aratep, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(aratel, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(arateu, t.decPlaces) +
        ') ';
    } else if (t.type == 'attPop') {
      var paratep, paratese, paratel, parateu;
      paratep = ((t.a + t.c) / (t.b + t.d) - t.c / t.d) * t.mult;
      paratese =
        Math.sqrt(
          (t.a + t.c) / Math.pow(t.b + t.d, 2) + t.c / Math.pow(t.d, 2),
        ) * t.mult;
      paratel = paratep - z * paratese;
      parateu = paratep + z * paratese;
      result = 'Attributable rate in population:';
      resultValue =
        Helper.roundNum(paratep, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(paratel, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(parateu, t.decPlaces) +
        ') ';
    } else if (t.type == 'attFracExp') {
      var afratep, afratel, afrateu;
      afratep = (irrp - 1) / irrp;
      afratel = Math.min((irrl - 1) / irrl, (irru - 1) / irru);
      afrateu = Math.max((irrl - 1) / irrl, (irru - 1) / irru);
      result = 'Attributable fraction in exposed:';
      resultValue =
        Helper.roundNum(afratep, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(afratel, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(afrateu, t.decPlaces) +
        ') ';
    } else if (t.type == 'attFracPop') {
      var iratepopp,
        iratepopl,
        iratepopu,
        irateop,
        irateol,
        irateou,
        pafratep,
        pafratel,
        pafrateu;
      iratepopp = (t.a + t.c) / (t.b + t.d);
      iratepopl =
        ((t.a + t.c) *
          Math.pow(
            1 - 1 / (9 * (t.a + t.c)) - (z / 3) * Math.sqrt(1 / (t.a + t.c)),
            3,
          )) /
        (t.b + t.d);
      iratepopu =
        ((t.a + t.c) *
          Math.pow(
            1 - 1 / (9 * (t.a + t.c)) + (z / 3) * Math.sqrt(1 / (t.a + t.c)),
            3,
          )) /
        (t.b + t.d);
      irateop = t.c / t.d;
      irateol =
        (t.c * Math.pow(1 - 1 / (9 * t.c) - (z / 3) * Math.sqrt(1 / t.c), 3)) /
        t.d;
      irateou =
        (t.c * Math.pow(1 - 1 / (9 * t.c) + (z / 3) * Math.sqrt(1 / t.c), 3)) /
        t.d;
      pafratep = (iratepopp - irateop) / iratepopp;
      pafratel = Math.min(
        (iratepopl - irateol) / iratepopl,
        (iratepopu - irateou) / iratepopu,
      );
      pafrateu = Math.max(
        (iratepopl - irateol) / iratepopl,
        (iratepopu - irateou) / iratepopu,
      );
      result = 'Attributable fraction in population:';
      resultValue =
        Helper.roundNum(iratepopp, t.decPlaces) +
        ' (' +
        Math.round(CI) +
        '% CI ' +
        Helper.roundNum(pafratel, t.decPlaces) +
        ' ' +
        toText +
        ' ' +
        Helper.roundNum(pafrateu, t.decPlaces) +
        ') ';
    } else {
      response.success = false;
      response.message = 'Không có dữ liệu phù hợp';
      return response;
    }
  }
  response.data = { result, resultValue };
  return response;
}

export default { calculate };
