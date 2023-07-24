var Buffer = require('@craftzdog/react-native-buffer').Buffer;
import {decode} from 'base-64';
var _0x1f18 = [
  '1017778BjVQCU',
  '4454pbhzGH',
  '2609jHSyuu',
  '259TNmJXY',
  'toString',
  '505425jhNLvQ',
  '2YTWqpm',
  'from',
  '413CeWrTc',
  '333BdkZFo',
  '3354524JUVieg',
  'base64',
  '16622DMndAx',
  '691DPuMju',
  'substr',
  '9WUrWrB',
];
(function (_0x2f4ad4, _0x60bf32) {
  var _0x3554d6 = _0x2a4c;
  while (!![]) {
    try {
      var _0x420b30 =
        parseInt(_0x3554d6(0x126)) * -parseInt(_0x3554d6(0x130)) +
        -parseInt(_0x3554d6(0x12b)) * parseInt(_0x3554d6(0x125)) +
        -parseInt(_0x3554d6(0x123)) +
        parseInt(_0x3554d6(0x12c)) * -parseInt(_0x3554d6(0x124)) +
        -parseInt(_0x3554d6(0x128)) * -parseInt(_0x3554d6(0x129)) +
        -parseInt(_0x3554d6(0x122)) * -parseInt(_0x3554d6(0x12f)) +
        parseInt(_0x3554d6(0x12d));
      if (_0x420b30 === _0x60bf32) break;
      else _0x2f4ad4['push'](_0x2f4ad4['shift']());
    } catch (_0x56d321) {
      _0x2f4ad4['push'](_0x2f4ad4['shift']());
    }
  }
})(_0x1f18, 0xb8f16);
function _0x2a4c(_0x5d1173, _0x21cf28) {
  return (
    (_0x2a4c = function (_0x1f1815, _0x2a4c47) {
      _0x1f1815 = _0x1f1815 - 0x122;
      var _0x168276 = _0x1f18[_0x1f1815];
      return _0x168276;
    }),
    _0x2a4c(_0x5d1173, _0x21cf28)
  );
}
export function btoac(_0x58b537) {
  var _0x54d1cd = _0x2a4c;
  return Buffer[_0x54d1cd(0x12a)](unescape(encodeURIComponent(_0x58b537)))[
    _0x54d1cd(0x127)
  ](_0x54d1cd(0x12e));
}
export function atobc(_0xfcbe71) {
  var _0x42ac13 = _0x2a4c;
  return decodeURIComponent(
    escape(
      Buffer[_0x42ac13(0x12a)](_0xfcbe71, _0x42ac13(0x12e))[_0x42ac13(0x127)](),
    ),
  );
}
export function strEncode(_0x18cad4) {
  var _0x5aaebf = _0x2a4c;
  for (var _0x21788d = 0x1; _0x21788d < 0x5; _0x21788d++) {
    _0x18cad4 =
      btoac(_0x18cad4)[_0x5aaebf(0x131)](_0x21788d) +
      btoac(_0x18cad4)[_0x5aaebf(0x131)](0x0, _0x21788d);
  }
  return _0x18cad4;
}
export function strDecode(_0x159d85) {
  var _0x4e84aa = _0x2a4c;
  if (_0x159d85)
    for (var _0x13493a = -0x4; _0x13493a < 0x0; _0x13493a++) {
      _0x159d85 = atobc(
        _0x159d85[_0x4e84aa(0x131)](_0x13493a) +
          _0x159d85[_0x4e84aa(0x131)](0x0, _0x159d85['length'] + _0x13493a),
      );
    }
  return _0x159d85;
}

/*
strEncode(<string>)

*/
