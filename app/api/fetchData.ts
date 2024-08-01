interface Colour {
	id: number;
	name: string;
	hex: string;
}

interface ApiResponse {
	data: Colour[];
}

export const fetchData = async () => {
	const { data } = await useFetch<ApiResponse>('/api/colours');
	console.log(data?.value?.data);
	return data?.value?.data as Colour[];
};
