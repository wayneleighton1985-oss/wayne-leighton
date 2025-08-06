// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.CF_PAGES_BRANCH || process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Remove clientId and token for self-hosted mode
  // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/books",
      publicFolder: "public"
    }
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
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "number",
            name: "priceDigital",
            label: "Digital Price",
            required: true
          },
          {
            type: "number",
            name: "pricePrint",
            label: "Print Price",
            required: true
          },
          {
            type: "image",
            name: "coverImageUrl",
            label: "Cover Image",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Leadership",
              "Business",
              "Marketing",
              "Personal Development"
            ],
            required: true
          },
          {
            type: "number",
            name: "publishedYear",
            label: "Published Year",
            required: true
          },
          {
            type: "number",
            name: "pages",
            label: "Pages",
            required: true
          },
          {
            type: "string",
            name: "isbn",
            label: "ISBN",
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
