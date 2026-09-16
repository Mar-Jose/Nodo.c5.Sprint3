import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1126px] flex-col border-x border-border bg-page text-center font-sans text-lg leading-[1.45] tracking-[0.18px] text-body">
      <section id="center" className="flex flex-col items-center px-4 py-12 sm:py-16">
        <div className="relative mb-6 h-[179px] w-[170px]">
          <img src={heroImg} className="absolute inset-0 h-[179px] w-[170px]" width="170" height="179" alt="" />
          <img src={reactLogo} className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2" alt="React logo" />
          <img src={viteLogo} className="absolute bottom-0 right-0 h-12 w-12" alt="Vite logo" />
        </div>
        <div>
          <h1 className="my-8 font-heading text-4xl font-medium tracking-[-1.68px] text-heading sm:text-6xl">Get started</h1>
          <p>
            Edit <code className="inline-flex rounded bg-surface px-2 py-1 font-mono text-[15px] leading-[1.35] text-heading">src/App.jsx</code> and save to test <code className="inline-flex rounded bg-surface px-2 py-1 font-mono text-[15px] leading-[1.35] text-heading">HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="mt-8 inline-flex rounded bg-surface px-3 py-2 font-mono text-heading"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <section id="next-steps" className="grid gap-12 border-t border-border px-8 py-12 sm:grid-cols-2">
        <div id="docs">
          <svg className="mx-auto mb-4 h-10 w-10" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="mb-2 font-heading text-xl font-medium text-heading sm:text-2xl">Documentation</h2>
          <p>Your questions, answered</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://vite.dev/" target="_blank">
                <img className="h-6 w-6" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://react.dev/" target="_blank">
                <img className="h-6 w-6" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="mx-auto mb-4 h-10 w-10" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="mb-2 font-heading text-xl font-medium text-heading sm:text-2xl">Connect with us</h2>
          <p>Join the Vite community</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="h-6 w-6"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="h-6 w-6"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://x.com/vite_js" target="_blank">
                <svg
                  className="h-6 w-6"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 text-link hover:underline" href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="h-6 w-6"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
