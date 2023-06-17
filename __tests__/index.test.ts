import { describe, expect, test } from "vitest"
import { stringArrayToGraphqlQuery } from "../index"

describe("format array of strings to graphql query string", () => {
	test("single string generates valid graphql query", () => {
		const keysArray = ["name"]

		// prettier-ignore
		expect(stringArrayToGraphqlQuery(keysArray)).toBe(
`{
  name
}`)
	})
})
