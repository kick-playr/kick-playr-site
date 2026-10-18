# Collaboration

- Expect the user to make changes alongside you. Preserve their edits and work
  with all current changes in Git, including user changes. When asked to commit,
  include all current changes unless the user explicitly requests otherwise.
- Keep final responses short.
- When the user says "commit and push", commit all current changes on a branch,
  push it, create a pull request with a clear, descriptive title and description,
  and merge the pull request into `main` after required checks pass. Do not push
  the changes directly to `main`.

# Website validation

- Do not start services for testing. The user already runs them in watch mode;
  use the existing preview at `http://localhost:8080`.

- After changes to website content or code, validate the rendered result in the
  browser preview, normally at `http://localhost:8080`.
- Refresh the preview when needed to ensure it shows the current changes.
- Inspect the affected screen at desktop and mobile widths, check affected
  translations, and exercise relevant interactions without submitting real data.
- Check readability, wrapping, spacing, overflow and the actual rendered content.
  TypeScript checks, tests and builds complement this visual check; they do not
  replace it.
