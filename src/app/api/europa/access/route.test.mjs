import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const routeSource = readFileSync(new URL("./route.ts", import.meta.url), "utf8")

test("allows Brenda to access the Europa journey", () => {
  assert.match(routeSource, /cce2a0889fcc8d839b3ac967daad51fda304509432a74d8d8119c76d453d46bb/)
  assert.match(routeSource, /displayName:\s*"Brenda"/)
  assert.match(routeSource, /alias:\s*"Bren"/)
})

test("allows Lucia's family to access the Europa journey", () => {
  assert.match(routeSource, /cdbad045874a3ce6ef98e6e2e89e03995962e77e5ac3539ca999592c009dd05a/)
  assert.match(routeSource, /displayName:\s*"Alicia"/)
  assert.match(routeSource, /alias:\s*"Mama de Lucia"/)
  assert.match(routeSource, /emoji:\s*"💐"/)

  assert.match(routeSource, /25f55638c8d8638888423f0c726706da546b1ef2368074b846f91fc0ee8affb3/)
  assert.match(routeSource, /displayName:\s*"Sofia"/)
  assert.match(routeSource, /alias:\s*"Hermana de Lucia"/)
  assert.match(routeSource, /emoji:\s*"👯"/)
})
