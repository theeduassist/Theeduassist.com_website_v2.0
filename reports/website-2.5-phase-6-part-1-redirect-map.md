# Website 2.5 Phase 6 Part 1 - Redirect Map

## Sources Configured
Redirects are managed primarily at the Vercel level inside `vercel.json`.

## Configured Redirects
| Source | Destination | Permanent | Reason |
|---|---|---|---|
| `/wp-admin(.*)` | `/404` | False | Block WP probing |
| `/wp-login.php(.*)` | `/404` | False | Block WP probing |
| `/xmlrpc.php(.*)` | `/404` | False | Block WP probing |
| `/.env(.*)` | `/404` | False | Security |
| `/.git(.*)` | `/404` | False | Security |
| `/phpmyadmin(.*)` | `/404` | False | Block DB probing |
| `/adminer(.*)` | `/404` | False | Block DB probing |

## Implicit Redirects
- Non-trailing slash to trailing slash (e.g. `/about` -> `/about/`) handled by Vercel edge via `"trailingSlash": true`.

No loop chains or unnecessary hops detected. Internal links consistently point to final destinations.
