export const stringArrayToGraphqlQuery = (
	keys: (string | string[])[]
): string => {
	return JSON.stringify(keys, null, 2)
		.replace(/[",]/g, "")
		.replace(/(\s+)\[/g, " {")
		.replace(/\[/g, "{")
		.replace(/\]/g, "}")
}
