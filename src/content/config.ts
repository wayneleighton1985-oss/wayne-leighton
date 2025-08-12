import { defineCollection, z } from 'astro:content';

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    format: z.enum(['eBook', 'Hard copy', 'Transcripts Edition', 'Seminar ticket']),
    price: z.number(),
    coverImageUrl: z.string(),
    category: z.enum(['Lawfare']),
    publishedYear: z.number(),
    pages: z.number(),
    isbn: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  books: booksCollection,
  pages: pagesCollection,
};