export interface Colour {
	id: number;
	name: string;
	hex: string;
}

export interface ApiResponse {
	data: Colour[];
}
