# Wayne Leighton Books

A modern, responsive e-commerce website built with Astro, TypeScript, Tailwind CSS, and Square for selling Wayne Leighton's collection of business and leadership books. Content management is handled by TinaCMS.

<!-- Deployment trigger: 2024-12-16 -->

## 🚀 Features

- **Modern Tech Stack**: Built with Astro 4.0, TypeScript, and Tailwind CSS
- **Content Management**: TinaCMS for easy content editing
- **E-commerce Ready**: Integrated with Square for secure direct payments
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Toggle between light and dark themes with preference persistence
- **SEO Optimized**: Meta tags, Open Graph, structured data, and optimized images
- **Performance**: Fast loading with optimized images and minimal JavaScript
- **Search Functionality**: Client-side search for books by title or author
- **Format Selection**: Choose between digital e-books and paperback copies
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## 📚 Book Formats

Each book is available in two formats:
- **Digital e-Book**: Instant download in PDF & EPUB formats
- **Paperback**: Physical book with free shipping on orders over $25

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wayne-leighton-books
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Square**
   - Sign up for a [Square account](https://squareup.com/)
   - Create payment links for each book in your Square dashboard
   - Update the `squarePaymentUrl` field in each book's markdown file with the corresponding Square payment link

4. **Configure TinaCMS**
   - For local development, run the setup script:
     ```bash
     npm run setup-tina:dev
     # or directly: ./setup-tina-dev.sh
     ```
   - For production deployment, run the production setup script:
     ```bash
     npm run setup-tina:prod
     # or directly: ./setup-tina-prod.sh
     ```
   - These scripts will create the appropriate environment files with the correct settings
   - For more detailed information about TinaCMS setup and troubleshooting, see [TINACMS-SETUP.md](./TINACMS-SETUP.md)

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Access the site at http://localhost:4321/ and the TinaCMS admin interface at http://localhost:4321/admin/index.html

6. **Build and deploy for production**
   ```bash
   npm run deploy:prod  # Interactive deployment workflow
   ```
   Or manually:
   ```bash
   npm run build:full  # Build for production
   npm run preview     # Preview the production build
   ```
   Access the production preview at http://localhost:4322/ and the TinaCMS admin interface at http://localhost:4322/admin/index.html

7. **Open your browser**
    - For development: Navigate to `http://localhost:4321` to see the website
    - For development: Navigate to `http://localhost:4321/admin/index.html` to access the TinaCMS admin interface
    - For production preview: Navigate to `http://localhost:4322` to see the website
    - For production preview: Navigate to `http://localhost:4322/admin/index.html` to access the TinaCMS admin interface

## 📝 Available Scripts

```bash
# Development
npm run dev         # Start development server

# Production
npm run build       # Build for production
npm run preview     # Preview production build locally
```

## 🔧 TinaCMS Deployment on Cloudflare Pages

For production deployment on Cloudflare Pages, TinaCMS requires specific environment variables to be set:

```
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
TINA_PUBLIC_IS_LOCAL=false
GITHUB_OWNER=CLAYYO
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=your-github-token
```

These variables are already configured in the `.env.production` file and the `cloudflare-pages.toml` configuration file.

### Cloudflare Pages Deployment Steps

1. Create a new Cloudflare Pages project connected to your GitHub repository
2. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18 (or latest LTS)
3. Add the environment variables in the Cloudflare Pages project settings
4. Deploy the site
5. The TinaCMS admin interface will be available at `/admin/` on your Cloudflare Pages domain

### GitHub Actions Deployment

Alternatively, you can use the included GitHub Actions workflow to deploy to Cloudflare Pages:

1. Set up the required secrets in your GitHub repository (see `GITHUB-SECRETS.md`)
2. Push to the main branch or manually trigger the workflow
3. The GitHub Action will build and deploy to Cloudflare Pages automatically

## 📂 Content Management

All content can be managed through the TinaCMS admin interface:

- **Books**: Edit book details, descriptions, prices, and cover images
- **Pages**: Edit content for Home, About, and Shop pages

```

## 🛠️ Other Scripts

- `npm run astro check` - Check for TypeScript errors
- `npm run tina check` - Check TinaCMS configuration
- `npm run astro` - Run Astro CLI commands

## 🏗️ Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── books.ts          # Book data and helper functions
│   ├── layouts/
│   │   └── MainLayout.astro  # Main layout with header/footer
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── shop.astro        # Shop page with search
│   │   ├── about.astro       # About Wayne Leighton
│   │   └── books/
│   │       └── [slug].astro  # Dynamic book detail pages
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## 🎨 Customization

### Adding New Books

Edit `src/data/books.ts` to add new books:

```typescript
{
  id: "unique-book-id",
  title: "Book Title",
  author: "Wayne Leighton",
  description: "Book description...",
  priceDigital: 19.99,
  pricePrint: 29.99,
  coverImageUrl: "https://example.com/cover.jpg",
  slug: "book-slug",
  category: "Business",
  publishedYear: 2023,
  pages: 280,
  isbn: "978-1234567890"
}
```

### Styling

The website uses Tailwind CSS with a custom color palette. Main brand colors:
- Primary: Orange (#ed751a and variants)
- Gray scale for text and backgrounds
- Dark mode support with `dark:` prefixes

### Square Configuration

The Square integration uses direct payment links. Key features:
- Direct checkout without cart functionality
- Secure payment processing through Square
- Individual payment links for each book format
- Simplified purchase flow

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with the static site ready for deployment.

### Deployment Options

The site can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import your project for seamless deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist/` folder to an S3 bucket
- **Cloudflare Pages**: Connect your repository for edge deployment

### Environment Variables

For production deployment, make sure to:
1. Update all Square payment URLs in book markdown files with live payment links
2. Update the `site` URL in `astro.config.mjs`
3. Test all payment links in your Square dashboard

## 🔧 Configuration

### Square Setup

1. **Create Account**: Sign up at [squareup.com](https://squareup.com/)
2. **Create Payment Links**: Generate payment links for each book in your Square dashboard
3. **Update Content**: Add `squarePaymentUrl` field to each book's markdown file
4. **Configure Products**: Set up products in Square with appropriate pricing
5. **Test Mode**: Use Square's sandbox environment for development testing

### SEO Configuration

Update the following in `MainLayout.astro`:
- Site title and description
- Open Graph images
- Canonical URLs
- Structured data

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
- Check the [Astro documentation](https://docs.astro.build/)
- Review [Snipcart documentation](https://docs.snipcart.com/)
- Open an issue in this repository

## 🎯 Performance

The website is optimized for performance:
- Static site generation with Astro
- Optimized images with proper loading
- Minimal JavaScript bundle
- CSS purging with Tailwind
- Fast CDN delivery for Snipcart assets

## 🔒 Security

- Secure payment processing through Snipcart
- No sensitive data stored locally
- HTTPS required for production
- Input validation and sanitization
- XSS protection through proper templating# TinaCMS Integration

## Deployment Status
Last deployment attempt: `2025-08-12 22:14:32`
