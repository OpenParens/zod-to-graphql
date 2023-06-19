import { describe, expect, test } from "vitest"
import { stringArrayToGraphqlQuery } from "../index"

describe("format array of strings to graphql query string", () => {
	test("single string array generates valid graphql query", () => {
		const keysArray = ["name"]

		// prettier-ignore
		expect(stringArrayToGraphqlQuery(keysArray)).toBe(
`{
  name
}`)
	})

	test("two strings array generates valid graphql query", () => {
		const keysArray = ["name", "age"]

		// prettier-ignore
		expect(stringArrayToGraphqlQuery(keysArray)).toBe(
`{
  name
  age
}`)
	})

	test("nested objects generated correctly", () => {
		const keysArray = ["name", ["firstName", "lastName"], "age"]

		// prettier-ignore
		expect(stringArrayToGraphqlQuery(keysArray)).toBe(
`{
  name {
    firstName
    lastName
  }
  age
}`)
	})
})
