import { Cm, Ft, In, M, Mm, Yd } from "../types/mesurements";

// Imperial -> Imperial
export function inToFt(inches: In): Ft {
    return `${+inches.split("in")[0] / 12}ft`;
}

export function ftToIn(feet: Ft): In {
    return `${+feet.split("ft")[0] * 12}in`;
}

export function ydToFt(yards: Yd): Ft {
    return `${+yards.split("yd")[0] * 3}ft`;
}

export function ftToYd(feet: Ft): Yd {
    return `${+feet.split("ft")[0] / 3}yd`;
}

export function inToYd(inches: In): Yd {
    return ftToYd(inToFt(inches));
}

export function ydToIn(yards: Yd): In {
    return ftToIn(ydToFt(yards));
}

// // Metric -> Metric

export function mmToCm(mm: Mm): Cm {
    return `${+mm.split("mm")[0] / 10}cm`;
}

export function cmToMm(cm: Cm): Mm {
    return `${+cm.split("cm")[0] * 10}mm`;
}

export function cmToM(cm: Cm): M {
    return `${+cm.split("cm")[0] / 100}m`;
}

export function mtoCm(m: M): Cm {
    return `${+m.split("in")[0] * 100}cm`;
}

export function mmToM(mm: Mm): M {
    return `${+mm.split("mm")[0] / 1000}m`;
}

export function mtoMm(m: M): Mm {
    return `${+m.split("m")[0] * 1000}mm`;
}

// // Metric -> Imperial

export function mmToIn(mm: Mm): In {
    return `${+mm.split("mm")[0] / 25.4}in`;
}

export function cmToIn(cm: Cm): In {
    return mmToIn(cmToMm(cm));
}

export function mToIn(m: M): In {
    return mmToIn(mtoMm(m));
}

export function mmToFt(mm: Mm): Ft {
    return inToFt(mmToIn(mm));
}

export function cmToFt(cm: Cm): Ft {
    return inToFt(cmToIn(cm));
}

export function mToFt(m: M): Ft {
    return inToFt(mToIn(m));
}

export function mmToYd(mm: Mm): Yd {
    return inToYd(mmToIn(mm));
}

export function cmToYd(cm: Cm): Yd {
    return inToYd(cmToIn(cm));
}

export function mToYd(m: M): Yd {
    return inToYd(mToIn(m));
}

//Imperial -> Metric

export function inToMm(inches: In): Mm {
    return `${+inches.split("in")[0] * 25.4}mm`;
}

export function inToCm(inches: In): Cm {
    return mmToCm(inToMm(inches));
}

export function inToM(inches: In): M {
    return mmToM(inToMm(inches));
}

export function ftToMm(feet: Ft): Mm {
    return inToMm(ftToIn(feet));
}

export function ftToCm(feet: Ft): Cm {
    return mmToCm(ftToMm(feet));
}

export function ftToM(feet: Ft): M {
    return mmToM(ftToMm(feet));
}

export function ydToMm(yards: Yd): Mm {
    return inToMm(ydToIn(yards));
}

export function ydToCm(yards: Yd): Cm {
    return mmToCm(ydToMm(yards));
}

export function ydToM(yards: Yd): M {
    return mmToM(ydToMm(yards));
}
