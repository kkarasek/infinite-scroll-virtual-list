import { defineEventHandler, getQuery } from 'h3';

interface Colour {
	id: number;
	name: string;
	hex: string;
}

const getRandomHexColour = (): string => {
	const letters = '0123456789ABCDEF';
	let colour = '#';
	for (let i = 0; i < 6; i++) {
		colour += letters[Math.floor(Math.random() * 16)];
	}
	return colour;
};

const generateItems = (count: number): Colour[] => {
	return Array.from({ length: count }, (_, i) => ({
		id: i + 1,
		name: `Colour ${i + 1}`,
		hex: getRandomHexColour(),
	}));
};

const items = generateItems(600);

export default defineEventHandler((event) => {
	const query = getQuery(event);
	const limit = parseInt(query.limit as string, 10) || 20;
	const offset = parseInt(query.offset as string, 10) || 0;

	const paginatedItems = items.slice(offset, offset + limit);

	return {
		total: items.length,
		limit,
		offset,
		data: paginatedItems,
	};
});
