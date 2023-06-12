import BaseResponse from '../Interfaces/BaseResponse';
import DiagnosticX01Request from '../Interfaces/Request/DiagnosticX01Request';
import Helper from '../Ultil/Helper';

var toText = 'to';

function calculate(t: DiagnosticX01Request) {
  return doCalculation(t);
}

function doCalculation(t: DiagnosticX01Request) {
  var response: BaseResponse = { success: true, data: [], message: '' };
  var z = Math.abs(Helper.NormSInv((1 - t.conf) / 2));
  var CI = t.conf * 100;
  var ap_r,
    ap_n,
    ap_p,
    ap_q,
    ap_a,
    ap_b,
    ap_c,
    tp_r,
    tp_n,
    tp_p,
    tp_q,
    tp_a,
    tp_b,
    tp_c,
    se_r,
    se_n,
    se_p,
    se_q,
    se_a,
    se_b,
    se_c,
    sp_r,
    sp_n,
    sp_p,
    sp_q,
    sp_a,
    sp_b,
    sp_c,
    ppv_r,
    ppv_n,
    ppv_p,
    ppv_q,
    ppv_a,
    ppv_b,
    ppv_c,
    npv_r,
    npv_n,
    npv_p,
    npv_q,
    npv_a,
    npv_b,
    npv_c,
    ap,
    ap_l,
    ap_u,
    tp,
    tp_l,
    tp_u,
    se,
    se_l,
    se_u,
    sp,
    sp_l,
    sp_u,
    ppv,
    ppv_l,
    ppv_u,
    npv,
    npv_l,
    npv_u,
    irpos,
    irpos_l,
    irpos_u,
    irneg,
    irneg_l,
    irneg_u;
  var result1, result1Value, result2, result2Value;

  ap_r = t.a + t.b;
  ap_n = t.a + t.b + t.c + t.d;
  ap_p = ap_r / ap_n;
  ap_q = 1 - ap_p;
  ap_a = 2 * ap_r + z * z;
  ap_b = z * Math.sqrt(z * z + 4 * ap_r * ap_q);
  ap_c = 2 * (ap_n + z * z);
  ap = ap_p;
  ap_l = (ap_a - ap_b) / ap_c;
  ap_u = (ap_a + ap_b) / ap_c;

  tp_r = t.a + t.c;
  tp_n = t.a + t.b + t.c + t.d;
  tp_p = tp_r / tp_n;
  tp_q = 1 - tp_p;
  tp_a = 2 * tp_r + z * z;
  tp_b = z * Math.sqrt(z * z + 4 * tp_r * tp_q);
  tp_c = 2 * (tp_n + z * z);
  tp = tp_p;
  tp_l = (tp_a - tp_b) / tp_c;
  tp_u = (tp_a + tp_b) / tp_c;

  se_r = t.a;
  se_n = t.a + t.c;
  se_p = se_r / se_n;
  se_q = 1 - se_p;
  se_a = 2 * se_r + z * z;
  se_b = z * Math.sqrt(z * z + 4 * se_r * se_q);
  se_c = 2 * (se_n + z * z);
  se = se_p;
  se_l = (se_a - se_b) / se_c;
  se_u = (se_a + se_b) / se_c;

  sp_r = t.d;
  sp_n = t.b + t.d;
  sp_p = sp_r / sp_n;
  sp_q = 1 - sp_p;
  sp_a = 2 * sp_r + z * z;
  sp_b = z * Math.sqrt(z * z + 4 * sp_r * sp_q);
  sp_c = 2 * (sp_n + z * z);
  sp = sp_p;
  sp_l = (sp_a - sp_b) / sp_c;
  sp_u = (sp_a + sp_b) / sp_c;

  ppv_r = t.a;
  ppv_n = t.a + t.b;
  ppv_p = ppv_r / ppv_n;
  ppv_q = 1 - ppv_p;
  ppv_a = 2 * ppv_r + z * z;
  ppv_b = z * Math.sqrt(z * z + 4 * ppv_r * ppv_q);
  ppv_c = 2 * (ppv_n + z * z);
  ppv = ppv_p;
  ppv_l = (ppv_a - ppv_b) / ppv_c;
  ppv_u = (ppv_a + ppv_b) / ppv_c;

  npv_r = t.d;
  npv_n = t.c + t.d;
  npv_p = npv_r / npv_n;
  npv_q = 1 - npv_p;
  npv_a = 2 * npv_r + z * z;
  npv_b = z * Math.sqrt(z * z + 4 * npv_r * npv_q);
  npv_c = 2 * (npv_n + z * z);
  npv = npv_p;
  npv_l = (npv_a - npv_b) / npv_c;
  npv_u = (npv_a + npv_b) / npv_c;

  irpos = t.a / (t.a + t.c) / (1 - t.d / (t.b + t.d));
  irpos_l = Math.exp(
    Math.log(irpos) -
      z *
        Math.sqrt(
          (1 - se) / ((t.a + t.b) * se) + sp / ((t.c + t.d) * (1 - sp)),
        ),
  );
  irpos_u = Math.exp(
    Math.log(irpos) +
      z *
        Math.sqrt(
          (1 - se) / ((t.a + t.b) * se) + sp / ((t.c + t.d) * (1 - sp)),
        ),
  );

  irneg = (1 - t.a / (t.a + t.c)) / (t.d / (t.b + t.d));
  irneg_l = Math.exp(
    Math.log(irneg) -
      z *
        Math.sqrt(
          se / ((t.a + t.b) * (1 - se)) + (1 - sp) / ((t.c + t.d) * sp),
        ),
  );
  irneg_u = Math.exp(
    Math.log(irneg) +
      z *
        Math.sqrt(
          se / ((t.a + t.b) * (1 - se)) + (1 - sp) / ((t.c + t.d) * sp),
        ),
  );
  if (t.result == 1) {
    result1 = 'Apparent prevalence:';
    result1Value =
      Helper.roundNum(ap, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(ap_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(ap_u, 2) +
      ') ';
    result2 = 'True prevalence:';
    result2Value =
      Helper.roundNum(tp, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(tp_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(tp_u, 2) +
      ') ';
  } else if (t.result == 1) {
    result1 = 'Sensitivity:';
    result1Value =
      Helper.roundNum(se, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(se_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(se_u, 2) +
      ') ';
    result2 = 'Specificity:';
    result2Value =
      Helper.roundNum(sp, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(sp_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(sp_u, 2) +
      ') ';
  } else if (t.result == 1) {
    result1 = 'Positive predictive value:';
    result1Value =
      Helper.roundNum(ppv, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(ppv_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(ppv_u, 2) +
      ') ';
    result2 = 'Negative predictive value:';
    result2Value =
      Helper.roundNum(npv, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(npv_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(npv_u, 2) +
      ') ';
  } else if (t.result == 1) {
    result1 = 'Positive likelihood ratio:';
    result1Value =
      Helper.roundNum(irpos, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(irpos_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(irpos_u, 2) +
      ') ';
    result2 = 'Negative likelihood ratio:';
    result2Value =
      Helper.roundNum(irneg, 2) +
      ' (' +
      Math.round(CI) +
      '% CI ' +
      Helper.roundNum(irneg_l, 2) +
      ' ' +
      toText +
      ' ' +
      Helper.roundNum(irneg_u, 2) +
      ') ';
  }

  response.data = { result1, result1Value, result2, result2Value };
  return response;
}

export default { calculate };
