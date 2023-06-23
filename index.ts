type gqlQueryArray = (string | string[] | gqlQueryArray)[]

export const stringArrayToGraphqlQuery = (keys: gqlQueryArray): string => {
	return JSON.stringify(keys, null, 2)
		.replace(/[",]/g, "")
		.replace(/(\s+)\[/g, " {")
		.replace(/\[/g, "{")
		.replace(/\]/g, "}")
}
