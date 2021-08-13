
export function ArrResetObj(arr = [], str = "") { // arr = [1, "2"] 值 number || string
  let hash = {};
  arr.forEach(v => {
    if (Object.prototype.toString.call(v) !== '[object Object]') {
      const s = String(str).toUpperCase();
      const s2 = String(v).toUpperCase();
      hash = { ...hash, [s2]: `${s}_${s2}` };
    }
  });
  return hash;
}
