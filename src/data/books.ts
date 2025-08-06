export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  priceDigital: number;
  pricePrint: number;
  coverImageUrl: string;
  slug: string;
  category: string;
  publishedYear: number;
  pages?: number;
  isbn?: string;
}

export const books: Book[] = [
  {
    id: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    author: "Wayne Leighton",
    description: "A comprehensive guide to mastering digital marketing in the modern age. Learn proven strategies for social media, content marketing, SEO, and paid advertising that will transform your business.",
    priceDigital: 19.99,
    pricePrint: 29.99,
    coverImageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=600&fit=crop",
    slug: "digital-marketing-mastery",
    category: "Business",
    publishedYear: 2023,
    pages: 280,
    isbn: "978-1234567890"
  },
  {
    id: "mindful-leadership",
    title: "Mindful Leadership: Leading with Purpose",
    author: "Wayne Leighton",
    description: "Discover how mindfulness can transform your leadership style. This book provides practical techniques for leading with clarity, compassion, and purpose in today's fast-paced business world.",
    priceDigital: 24.99,
    pricePrint: 34.99,
    coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    slug: "mindful-leadership",
    category: "Leadership",
    publishedYear: 2023,
    pages: 320,
    isbn: "978-1234567891"
  },
  {
    id: "creative-problem-solving",
    title: "Creative Problem Solving Techniques",
    author: "Wayne Leighton",
    description: "Unlock your creative potential with proven problem-solving methodologies. Learn design thinking, lateral thinking, and innovative approaches to tackle any challenge.",
    priceDigital: 17.99,
    pricePrint: 27.99,
    coverImageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=600&fit=crop",
    slug: "creative-problem-solving",
    category: "Self-Help",
    publishedYear: 2022,
    pages: 240,
    isbn: "978-1234567892"
  },
  {
    id: "sustainable-business-practices",
    title: "Sustainable Business Practices",
    author: "Wayne Leighton",
    description: "A practical guide to implementing sustainable practices in your business. Learn how to reduce environmental impact while increasing profitability and stakeholder value.",
    priceDigital: 22.99,
    pricePrint: 32.99,
    coverImageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    slug: "sustainable-business-practices",
    category: "Business",
    publishedYear: 2023,
    pages: 300,
    isbn: "978-1234567893"
  },
  {
    id: "future-of-work",
    title: "The Future of Work: Adapting to Change",
    author: "Wayne Leighton",
    description: "Navigate the evolving workplace landscape with confidence. This book explores remote work, AI integration, and the skills needed to thrive in tomorrow's economy.",
    priceDigital: 21.99,
    pricePrint: 31.99,
    coverImageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=600&fit=crop",
    slug: "future-of-work",
    category: "Technology",
    publishedYear: 2023,
    pages: 260,
    isbn: "978-1234567894"
  }
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find(book => book.slug === slug);
}

export function getFeaturedBooks(count: number = 4): Book[] {
  return books.slice(0, count);
}