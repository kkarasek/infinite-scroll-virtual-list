export interface Colour {
	id: number;
	name: string;
	hex: string;
}

export interface ApiResponse {
	data: Colour[];
}

export const fetchData = async (limit, offset) => {
	const { data } = await useFetch<ApiResponse>('/api/colours', {
		query: {
			limit,
		},
	});
	console.log(data?.value?.data);
	return data?.value?.data;
};
