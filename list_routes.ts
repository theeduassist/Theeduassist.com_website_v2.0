import { getAllPublicRoutes } from "./src/lib/content/getAllPublicRoutes";
import { getBlogPostSummaries } from "./src/lib/content/getAllBlogPosts";

async function main() {
  const routes = await getAllPublicRoutes();
  console.log(JSON.stringify(routes.map(r => r.path), null, 2));
}
main();
