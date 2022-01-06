function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hashString(s) {
  return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
};

function lerp(a, b, lerpFactor) {
  return ((1 - lerpFactor) * a) + (lerpFactor * b);
}

function lerpAngle(a, b, lerpFactor) // Lerps from angle a to b (both between 0.f and 360.f), taking the shortest path
{
  let result;
  let diff = b - a;
  if (diff < -180) {
    // lerp upwards past 360
    b += 360;
    result = lerp(a, b, lerpFactor);
    if (result >= 360) {
      result -= 360;
    }
  }
  else if (diff > 180) {
    // lerp downwards past 0
    b -= 360;
    result = lerp(a, b, lerpFactor);
    if (result < 0) {
      result += 360;
    }
  }
  else {
    // straight lerp
    result = lerp(a, b, lerpFactor);
  }

  return result;
}

export function hashStringArray(array) {
  return array.reduce((acc, curr)=>acc+hashString(curr), 0);
}

export function colorFromHash(hash) {
  // 35 comes from PRIMARY_COLOR, S and L were selected by trying different values 
  return hslToHex(lerpAngle(hash%360, 35, 0.63), 15, 60);
}