import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    format: z.enum(['E-book', 'Print', 'Both']),
    price: z.number(),
    coverImageUrl: z.string(),
    category: z.enum(['Lawfare']),
    publishedYear: z.number(),
    pages: z.number(),
    isbn: z.string().optional(),
  }),
});

export const collections = {
  books: booksCollection,
};