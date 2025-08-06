import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    priceDigital: z.number(),
    pricePrint: z.number(),
    coverImageUrl: z.string(),
    category: z.enum(['Leadership', 'Business', 'Marketing', 'Personal Development']),
    publishedYear: z.number(),
    pages: z.number(),
    isbn: z.string(),
  }),
});

export const collections = {
  books: booksCollection,
};