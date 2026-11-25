export const meta = {
  name: 'build-wish',
  description: 'Build the wish from its contract and @must scenarios with parallel agents, then integrate until all tests are green',
  whenToUse: 'Step 4 of the webinar: the wish has a spec with a Contract section and feature files tagged @must or @later',
  phases: [
    { title: 'Build', detail: 'tests, data, route and view in parallel, one owner per file' },
    { title: 'Integrate', detail: 'typecheck and whole suite until green' },
  ],
}

// args (all optional):
//   spec:     path of the wish's spec, e.g. 'docs/specs/sketch.md'
//   features: its feature files, e.g. ['features/sketch-add.feature', ...] -> one test agent per file
//   root:     project root, default '.' (a dry run passes a worktree path)
//   effort:   reasoning effort of the four builders, default 'low'
//   a plain sentence instead of an object is taken as a hint that names the wish
const a = typeof args === 'string' ? { hint: args } : args || {}
const root = a.root || '.'
const effort = a.effort || 'low'
const features = Array.isArray(a.features) && a.features.length ? a.features : null

const where = a.spec
  ? `The wish is specified in ${a.spec}.`
  : a.hint
    ? `The host named the wish like this: "${a.hint}". Find its spec in docs/specs/ and its feature files in features/ through docs/SPEC.md.`
    : 'Find the wish through docs/SPEC.md: it is the spec in docs/specs/ whose feature files in features/ have no test file in app/test/ yet.'

// A piped or wrapped command waits for the host's approval. In the first dry run one "| tail" cost 19 minutes.
const plainShell =
  'Run shell commands exactly as written in this prompt, one command per call: no pipes, no tail, head or grep, no echo or redirects appended. Anything else waits for the approval of the host and stalls the build.'

const shared = `
Project root: ${root}. Every path below is relative to it. Run npm with --prefix ${root}/app.
${where} Read its "Contract" section and the scenarios tagged @must in its feature files.
The contract is binding: use its names, columns, routes, form fields and HTML hooks exactly, so that your file fits the files the other agents write at this very moment.
Several agents build in parallel. Edit ONLY the files you own. Do not wait for the others, do not run git, do not ask questions: when something is unclear, take the reading closest to the contract and name it in your report.
${plainShell}
Build only what a @must scenario needs. Leave @later scenarios alone. Existing behaviour and existing tests stay as they are.
Report in three lines: files changed, what you built, any assumption you made.`

const testAgent = (feature) => () =>
  agent(
    `You write the failing tests for the wish.
You own: ${feature
      ? `one new test file in app/test/ for ${feature}, named after it. Do not edit any other test file; a helper you need goes into your own file.`
      : 'the new test files in app/test/, one per feature file of the wish, and app/test/attendee.ts if a helper must learn a new form field.'}
One test per @must scenario, named after the scenario title. Reuse the helpers in app/test/attendee.ts.
When the file is written, run only your new tests once (npm --prefix ${root}/app test -- <your file>) and put the number of failing tests on the first line of your report as "RED: <n>". Do not touch app/src.
${shared}`,
    { label: feature ? `tests:${feature}` : 'tests', phase: 'Build', effort },
  )

const builders = [
  {
    key: 'data',
    owns: 'the one new migration in app/migrations/ with the number from the contract (additive only: new tables, or new columns with a default or NULL; never edit an existing migration) and app/src/db.ts',
  },
  { key: 'route', owns: 'app/src/index.ts: routes, validation and error handling' },
  { key: 'view', owns: 'app/src/views.ts: HTML, styles and the inline client script' },
]

phase('Build')
const reports = await parallel([
  ...(features ? features.map((f) => testAgent(f)) : [testAgent(null)]),
  ...builders.map((b) => () =>
    agent(
      `You build one layer of the wish.
You own: ${b.owns}.
Do not run the test suite; the integrator does that when everyone is done.
${shared}`,
      { label: b.key, phase: 'Build', effort },
    ),
  ),
])

const done = reports.filter(Boolean)
if (done.length < reports.length) log(`${reports.length - done.length} build agent(s) returned nothing; the integrator closes the gap`)

phase('Integrate')
const result = await agent(
  `Parallel agents just built the wish: tests in app/test, the migration and app/src/db.ts, app/src/index.ts, app/src/views.ts. Make it deployable.
Project root: ${root}. ${where}
Their reports:
${done.join('\n---\n')}

Run both commands:
  npm exec --prefix ${root}/app -- tsc --noEmit -p ${root}/app/tsconfig.json
  npm --prefix ${root}/app test
${plainShell}
Fix what is red with the smallest change. The contract wins over code; a test wins over code unless the test contradicts its scenario. Existing tests stay unchanged and green. Do not build @later scenarios, do not run git, do not ask questions.
Stop as soon as both commands pass. After three fix rounds without green, stop and report what is still red.`,
  {
    label: 'integrator',
    phase: 'Integrate',
    effort: 'medium',
    schema: {
      type: 'object',
      properties: {
        green: { type: 'boolean', description: 'typecheck clean and every test passing' },
        tests_passed: { type: 'integer' },
        tests_failed: { type: 'integer' },
        typecheck_clean: { type: 'boolean' },
        summary: { type: 'string', description: 'what was fixed, what is still red, in a few lines' },
      },
      required: ['green', 'tests_passed', 'tests_failed', 'typecheck_clean', 'summary'],
    },
  },
)

return { result, reports: done }
