import { ZodObject } from "zod"

type gqlQueryArray = (string | string[] | gqlQueryArray)[]

const getKeys = (schema: any): gqlQueryArray => {
	let arr = []
	for (let key in schema) {
		if (schema[key] instanceof ZodObject) {
			arr.push(key, getKeys(schema[key].shape))
		} else {
			arr.push(key.toString())
		}
	}

	return arr
}

export const zodToKeysArray = (zodSchema: ZodObject<any>): gqlQueryArray => {
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
