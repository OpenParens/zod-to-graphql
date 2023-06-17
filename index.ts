export const stringArrayToGraphqlQuery = (keys: string[]): string => {
	return JSON.stringify(keys, null, 2)
		.replace(/"/g, "")
		.replace("[", "{")
		.replace("]", "}")
}
