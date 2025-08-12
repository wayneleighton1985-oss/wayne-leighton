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
            type: "rich-text",
            name: "body",
            label: "Page Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});