import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '7a0024bf17443a12d8bf5054e078bd42af60c5e0', queries,  });
export default client;
  