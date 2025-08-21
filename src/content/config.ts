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
    squarePaymentUrl: z.string().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      logoUrl: z.string().optional(),
      logoAlt: z.string().optional(),
      primaryButton: z.object({
        text: z.string(),
        url: z.string(),
      }).optional(),
      secondaryButton: z.object({
        text: z.string(),
        url: z.string(),
      }).optional(),
    }).optional(),
    featuredBooks: z.object({
      title: z.string(),
      description: z.string(),
      viewAllButton: z.object({
        text: z.string(),
        url: z.string(),
      }),
    }).optional(),
    about: z.object({
      imageUrl: z.string().optional(),
      imageAlt: z.string().optional(),
      learnMoreButton: z.object({
        text: z.string(),
        url: z.string(),
      }),
    }).optional(),
    testimonials: z.object({
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        quote: z.string(),
        author: z.string(),
        rating: z.number(),
      })),
    }).optional(),
    quickFacts: z.object({
      title: z.string(),
      countriesVisited: z.string(),
      yearsAsNomad: z.string(),
      booksPublished: z.string(),
      legalCasesWon: z.string(),
    }).optional(),
  }),
});

export const collections = {
  books: booksCollection,
  pages: pagesCollection,
};