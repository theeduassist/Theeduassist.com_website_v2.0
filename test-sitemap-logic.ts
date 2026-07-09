import { getAllPublicRoutes } from "./src/lib/content/getAllPublicRoutes";

async function main() {
  const routes = await getAllPublicRoutes();
  console.log(routes.filter(r => r.path === '/case-studies/').length > 0);
}
main();
