# ohne + Next

A website whose pages you edit in a CMS. The CMS is an [ohne](https://ohne.dev) app, the website is
[Next](https://nextjs.org), and both live in this one repository.

Create your own copy with:

```sh
pnpm create ohne@latest my-site --web next
```

## Getting started

Install from the root, then start both apps:

```sh
pnpm install
pnpm dev
```

| App       | Address                 |
| --------- | ----------------------- |
| Website   | `http://localhost:3000` |
| Dashboard | `http://localhost:9000` |
| API       | `http://localhost:9001` |

The website opens on a Home page that comes from the CMS. Open the dashboard, create your admin
account, and edit that page under **Pages**. The website beside the form changes as you type.

## What is inside

```text
my-site/
├── apps/
│   ├── backend/          the CMS: an ohne app
│   └── web/              the website: a Next app
├── .gitignore
├── package.json
└── pnpm-workspace.yaml
```

- `pnpm dev` starts both apps, `pnpm build` builds the website, and `pnpm typecheck` checks both.
- `pnpm test` runs the backend's tests, `pnpm lint` lints both apps, and `pnpm format` formats them.
- The backend has nothing to build.
- `pnpm-workspace.yaml` pins the ohne packages and the website's framework once, in its `catalog`,
  and the apps name them as `catalog:`.

## The backend

`apps/backend` is a regular ohne app with the [CMS](https://ohne.dev/docs/cms/setup) on top.

- `ohne.config.ts` stacks the CMS and says which website paths show which pages.
- `collections/Pages.ts` holds your pages. Each has a title, a slug, a status and its content.
- `blocks/` holds the blocks a page is built from: `Hero` and `Prose`.
- `boot/seed.ts` creates the Home page the first time you start.

Run an `ohne` command in it from the root:

```sh
pnpm --filter backend exec ohne sync
```

The data lives in `apps/backend/.data/`, and uploaded files in `apps/backend/.uploads/`. Delete
both to start over.

## The website

`apps/web` is a regular Next app with [`@ohnejs/next`](https://github.com/ohnejs/next), which reads
each page from the CMS.

- `lib/ohne.ts` connects to the CMS and names your API.
- `proxy.ts` hands each page its path and serves the live preview's script.
- `app/[[...slug]]/page.tsx` renders every path. It asks the CMS what the path shows, and answers
  `404` when no page has it.
- `components/blocks/` holds one component per block, named like the block.
- `app/[[...slug]]/layout.tsx` holds the header and the footer, and `app/styles/` the styles.
- `app/[[...slug]]/not-found.tsx` shows a missing page, and `app/error.tsx` an API that fails.

The CMS writes the types of your pages and blocks to `apps/web/ohne.ts`, and rewrites them while
`pnpm dev` runs. Commit that file, so the website builds without the backend.

See [Frameworks](https://ohne.dev/docs/cms/frameworks#next) for how the page, the blocks and the
live preview fit together.

## Adding a block

1. Add a file to `apps/backend/blocks/`, like `Quote.ts`.
2. List it in the `allow` of `content` in `apps/backend/collections/Pages.ts`.
3. Add its component as `apps/web/components/blocks/Quote.tsx`, and name it in `components` in
   `page.tsx` and `not-found.tsx`.

`pnpm typecheck` names a block that has no component yet. See
[Blocks](https://ohne.dev/docs/database/blocks).

## Deploying

Each app deploys on its own. See [Deploying](https://ohne.dev/docs/project/monorepo#deploying).

- The backend deploys like [any ohne app](https://ohne.dev/docs/production/deployment). Set
  `SITE_URL` to the website's public address.
- The website builds with `pnpm build` and runs as `pnpm --filter web start`, with `OHNE_API` set
  to your API.

The seed stays out of production, so a new install starts empty. Create your Home page in the
dashboard, with the slug `index`.

## Learn more

- [The CMS](https://ohne.dev/docs/cms/setup)
- [Your website](https://ohne.dev/docs/cms/website)
- [Monorepo](https://ohne.dev/docs/project/monorepo)
