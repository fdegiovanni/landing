import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const routeSource = readFileSync(new URL("./route.ts", import.meta.url), "utf8")

test("allows Brenda to access the Europa journey", () => {
  assert.match(routeSource, /cce2a0889fcc8d839b3ac967daad51fda304509432a74d8d8119c76d453d46bb/)
  assert.match(routeSource, /displayName:\s*"Brenda"/)
  assert.match(routeSource, /alias:\s*"Bren"/)
})
