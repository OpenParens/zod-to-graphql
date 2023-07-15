import { AnyZodObject, ZodObject } from "zod"

type gqlQueryArray = (string | string[] | gqlQueryArray)[]

const getCleanSchema = (schema: AnyZodObject): AnyZodObject => {
	return schema.isNullable() || schema.isOptional()
		? getCleanSchema(schema.unwrap())
		: schema
}

const getKeys = (schema: AnyZodObject): gqlQueryArray => {
	let arr = []

	for (let key in schema) {
		const cleanSchema = getCleanSchema(schema[key])

		if (cleanSchema instanceof ZodObject) {
			arr.push(key, getKeys(cleanSchema.shape))
		} else {
			arr.push(key.toString())
		}
	}

	return arr
}

export const zodToKeysArray = (zodSchema: AnyZodObject): gqlQueryArray => {
	const schemaShape = zodSchema.shape
	return getKeys(schemaShape)
}

export const stringArrayToGraphqlQuery = (keys: gqlQueryArray): string => {
	return JSON.stringify(keys, null, 2)
		.replace(/[",]/g, "")
		.replace(/(\s+)\[/g, " {")
		.replace(/\[/g, "{")
		.replace(/\]/g, "}")
}
