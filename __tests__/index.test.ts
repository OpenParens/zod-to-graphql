import { describe, expect, test } from "vitest"
import { z } from "zod"
import { stringArrayToGraphqlQuery, zodToKeysArray } from "../index"

describe("generate string gql query string array from zod schema", () => {
	test("zod object schema with single field generates single string array", () => {
		const schema = z.object({
			name: z.string(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name"])
	})

	test("zod object schema with two fields generates two string array", () => {
		const schema = z.object({
			name: z.string(),
			age: z.number(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", "age"])
	})

	test("zod object schema with nested fields generates nested string array", () => {
		const schema = z.object({
			name: z.object({
				firstName: z.string(),
				lastName: z.string(),
			}),
			age: z.number(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", ["firstName", "lastName"], "age"])
	})

	test("zod object schema with a nullable field", () => {
		const schema = z.object({
			name: z.string(),
			age: z.number().nullable(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", "age"])
	})

	test("zod object schema with a nullable object", () => {
		const schema = z.object({
			name: z
				.object({
					firstName: z.string(),
					lastName: z.string(),
				})
				.nullable(),
			age: z.number().nullable(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", ["firstName", "lastName"], "age"])
	})

	test("zod object schema with a optional object", () => {
		const schema = z.object({
			name: z
				.object({
					firstName: z.string(),
					lastName: z.string(),
				})
				.optional(),
			age: z.number().nullable(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", ["firstName", "lastName"], "age"])
	})

	test("zod object schema with nullable applied to object twice", () => {
		const schema = z.object({
			name: z
				.object({
					firstName: z.string(),
					lastName: z.string(),
				})
				.nullable()
				.nullable(),
			age: z.number().nullable(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", ["firstName", "lastName"], "age"])
	})

	test("zod object schema with nullish object", () => {
		const schema = z.object({
			name: z
				.object({
					firstName: z.string(),
					lastName: z.string(),
				})
				.nullish(),
			age: z.number().nullable(),
		})

		const keysArray = zodToKeysArray(schema)

		expect(keysArray).toEqual(["name", ["firstName", "lastName"], "age"])
	})
})

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

	test("nested two deep to test typing", () => {
		const keysArray = [
			"name",
			["first", ["initial", "name"], "last", ["initial", "name"]],
			"age",
		]

		// prettier-ignore
		expect(stringArrayToGraphqlQuery(keysArray)).toBe(
`{
  name {
    first {
      initial
      name
    }
    last {
      initial
      name
    }
  }
  age
}`)
	})
})
