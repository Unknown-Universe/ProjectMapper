import { Mesurement } from "../types/mesurements";
import {
    cmToFt,
    cmToIn,
    cmToM,
    cmToMm,
    cmToYd,
    ftToCm,
    ftToIn,
    ftToM,
    ftToMm,
    ftToYd,
    inToCm,
    inToFt,
    inToM,
    inToMm,
    inToYd,
    mmToCm,
    mmToFt,
    mmToIn,
    mmToM,
    mmToYd,
    mtoCm,
    mToFt,
    mToIn,
    mtoMm,
    mToYd,
    ydToCm,
    ydToFt,
    ydToIn,
    ydToM,
    ydToMm,
} from "./converters";

export function unitOf(mesurement: Mesurement): string {
    return mesurement.replace(/\d+/, "");
}

export function valueOf(mesurement: Mesurement): number {
    return +mesurement.replace(/\D+/, "");
}

export function alignUnits(align: Mesurement, to: Mesurement): Mesurement {
    const unitOfAlign: string = unitOf(align);
    const unitOfTo: string = unitOf(to);

    const alignAmount: number = +align.split(unitOfAlign)[0];

    if (unitOfAlign === unitOfTo) return align;

    switch (unitOfAlign) {
        case "m":
            switch (unitOfTo) {
                case "cm":
                    return mtoCm(`${alignAmount}m`);
                case "mm":
                    return mtoMm(`${alignAmount}m`);
                case "in":
                    return mToIn(`${alignAmount}m`);
                case "ft":
                    return mToFt(`${alignAmount}m`);
                case "yd":
                    return mToYd(`${alignAmount}m`);
            }
        case "cm":
            switch (unitOfTo) {
                case "m":
                    return cmToM(`${alignAmount}cm`);
                case "mm":
                    return cmToMm(`${alignAmount}cm`);
                case "in":
                    return cmToIn(`${alignAmount}cm`);
                case "ft":
                    return cmToFt(`${alignAmount}cm`);
                case "yd":
                    return cmToYd(`${alignAmount}cm`);
            }
        case "mm":
            switch (unitOfTo) {
                case "cm":
                    return mmToCm(`${alignAmount}mm`);
                case "m":
                    return mmToM(`${alignAmount}mm`);
                case "in":
                    return mmToIn(`${alignAmount}mm`);
                case "ft":
                    return mmToFt(`${alignAmount}mm`);
                case "yd":
                    return mmToYd(`${alignAmount}mm`);
            }
        case "in":
            switch (unitOfTo) {
                case "cm":
                    return inToCm(`${alignAmount}in`);
                case "mm":
                    return inToMm(`${alignAmount}in`);
                case "m":
                    return inToM(`${alignAmount}in`);
                case "ft":
                    return inToFt(`${alignAmount}in`);
                case "yd":
                    return inToYd(`${alignAmount}in`);
            }
        case "ft":
            switch (unitOfTo) {
                case "cm":
                    return ftToCm(`${alignAmount}ft`);
                case "mm":
                    return ftToMm(`${alignAmount}ft`);
                case "in":
                    return ftToIn(`${alignAmount}ft`);
                case "m":
                    return ftToM(`${alignAmount}ft`);
                case "yd":
                    return ftToYd(`${alignAmount}ft`);
            }
        case "yd":
            switch (unitOfTo) {
                case "cm":
                    return ydToCm(`${alignAmount}yd`);
                case "mm":
                    return ydToMm(`${alignAmount}yd`);
                case "in":
                    return ydToIn(`${alignAmount}yd`);
                case "ft":
                    return ydToFt(`${alignAmount}yd`);
                case "m":
                    return ydToM(`${alignAmount}yd`);
            }
        default:
            return "-1in";
    }
}

export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}
