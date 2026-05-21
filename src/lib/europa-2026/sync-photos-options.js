"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePhotoSourceDate = resolvePhotoSourceDate;

function resolvePhotoSourceDate(dateISO, sourceDateParam) {
  return sourceDateParam ?? dateISO
}
