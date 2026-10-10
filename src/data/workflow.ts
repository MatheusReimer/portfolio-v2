/**
 * The AI engineering loop I use day to day, in the order a task moves through it.
 *
 * `built` means the tool is my own code; `adopted` means an open-source tool I
 * run as part of the loop. Never mark something built that I did not write.
 * The tools are private, so no links.
 */
export interface WorkflowStage {
  id: string
  /** Tool name, shown as-is in every language. */
  tool: string
  origin: 'built' | 'adopted'
  title: string
  body: string
}

export const workflow: WorkflowStage[] = [
  {
    id: 'memory',
    tool: 'project-memory',
    origin: 'built',
    title: 'Memory that builds up',
    body: 'An agent starts every session knowing nothing about the project. So each one loads two files: my global preferences and the notes for that project. When I correct a mistake, the correction gets written down as a rule. A hook warns me when a project has no memory file, or when it has grown so long it costs more tokens than it saves.',
  },
  {
    id: 'plan',
    tool: 'War Table',
    origin: 'built',
    title: 'Plans I can click on',
    body: 'Before writing code, the agent puts the plan on an HTML page that opens inside my terminal. I comment on parts of it, quote lines back and pick between options. It reads my feedback through a small CLI and revises. Catching a wrong assumption here is much cheaper than catching it in a pull request.',
  },
  {
    id: 'build',
    tool: 'Warband',
    origin: 'built',
    title: 'Three workers at once',
    body: 'When a request splits into independent pieces, a commander agent hands each piece to a worker. Every worker gets its own git worktree and its own terminal pane, so they never step on each other. Up to three run at a time. I read what they report instead of watching them type.',
  },
  {
    id: 'validate',
    tool: 'no-mistakes',
    origin: 'adopted',
    title: 'Nothing ships on trust',
    body: 'Every change goes through a local gate before it becomes a pull request: rebase, a review by a fresh agent that tries to break it, tests, lint, then CI. For bugs I add one rule of my own. Reproduce it end to end first, and confirm the fix the same way.',
  },
  {
    id: 'measure',
    tool: 'Munitorum',
    origin: 'built',
    title: 'Knowing what it costs',
    body: 'Munitorum reads every agent transcript into SQLite and prices the tokens the way the bill does. The expensive part is usually context: a big file read early in a session gets paid for again on every turn after it. It ranks that kind of waste, and a hook warns the agent mid-session when one tool result is too big.',
  },
  {
    id: 'learn',
    tool: 'Munitorum review',
    origin: 'built',
    title: 'Closing the loop',
    body: 'Once a week the agent goes through its own most expensive sessions and suggests lessons on a War Table page. I keep some and drop the rest. The ones I keep go back into memory, and the next session starts with them.',
  },
]

/** The terminal the whole loop runs in. */
export const workflowTerminal = {
  title: 'Everything happens in the terminal',
  body: [
    'I work in Wave Terminal, and I built a sidebar for it. Claude Code hooks report to a small local server, so at a glance I can see which sessions are working and which are waiting on me, what the Warband workers are doing, and how many tokens I have spent today against the weekly average. My projects sit there too, with one-click actions.',
    'The server only accepts connections from my own machine, and every call needs a token. Most of my prompts are dictated by voice rather than typed.',
  ],
}

export const workflowStack = ['Claude Code', 'MCP', 'Node.js', 'SQLite', 'Git worktrees', 'Agent hooks', 'Wave Terminal']
