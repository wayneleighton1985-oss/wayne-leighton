import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  
  // Use environment variable to determine mode, default to production
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  // The local flag is now set via the TINA_PUBLIC_IS_LOCAL env var

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "", // Empty basePath for correct asset loading
  },
  
  // Configure the API URL for TinaCMS
  // The API URL must be set in the correct location based on TinaCMS type definitions
  backend: {
    // Using the apiURL property within the backend configuration object
    apiUrl: process.env.TINA_PUBLIC_IS_LOCAL === 'true'
      ? 'http://localhost:4001/graphql'
      : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`,
  },
  media: {
    tina: {
      mediaRoot: "images/books",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "books",
        label: "Books",
        path: "src/content/books",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "format",
            label: "Format",
            options: [
              "eBook",
              "Hard copy",
              "Transcripts Edition",
              "Seminar ticket"
            ],
            required: true,
          },
          {
            type: "number",
            name: "price",
            label: "Price",
            required: true,
          },
          {
            type: "image",
            name: "coverImageUrl",
            label: "Cover Image",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Lawfare"
            ],
            required: true,
          },
          {
            type: "number",
            name: "publishedYear",
            label: "Published Year",
            required: true,
          },
          {
            type: "number",
            name: "pages",
            label: "Pages",
            required: true,
          },
          {
            type: "string",
            name: "isbn",
            label: "ISBN",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true,
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "logoUrl",
                label: "Logo URL",
                required: false,
              },
              {
                type: "string",
                name: "logoAlt",
                label: "Logo Alt Text",
                required: false,
              },
              {
                type: "object",
                name: "primaryButton",
                label: "Primary Button",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "Button URL",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "secondaryButton",
                label: "Secondary Button",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "Button URL",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "featuredBooks",
            label: "Featured Books Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
                required: true,
              },
              {
                type: "object",
                name: "viewAllButton",
                label: "View All Button",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "Button URL",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              {
                type: "string",
                name: "imageUrl",
                label: "Wayne's Photo URL",
                required: false,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Photo Alt Text",
                required: false,
              },
              {
                type: "object",
                name: "learnMoreButton",
                label: "Learn More Button",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "Button URL",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
                required: true,
              },
              {
                type: "object",
                name: "items",
                label: "Testimonials",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Testimonial Quote",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author Name",
                    required: true,
                  },
                  {
                    type: "number",
                    name: "rating",
                    label: "Star Rating (1-5)",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
        ],
      },
      {
        name: "footer",
        label: "Footer",
        path: "src/content/footer",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Footer Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "companyName",
            label: "Company Name",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Company Description",
            required: true,
          },
          {
            type: "number",
            name: "copyrightYear",
            label: "Copyright Year",
            required: true,
          },
          {
            type: "string",
            name: "copyrightText",
            label: "Copyright Text",
            required: true,
          },
          {
            type: "object",
            name: "socialMedia",
            label: "Social Media Links",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter URL",
                required: false,
              },
              {
                type: "string",
                name: "facebook",
                label: "Facebook URL",
                required: false,
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn URL",
                required: false,
              },
            ],
          },
          {
            type: "object",
            name: "facebookGroup",
            label: "Facebook Group",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Group Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Group Description",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "Group URL",
                required: true,
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
});