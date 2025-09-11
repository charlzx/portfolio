🙄
<br>
<br>
<img align="center" src="https://github-readme-stats.vercel.app/api?username=charlzx&show_icons=true&include_all_commits=true&hide_border=true" alt="Charles's GitHub stats" />
## Notes about Vercel build error

If Vercel fails during `npm install` with an `ERESOLVE` peer dependency error involving `react-helmet-async` and React 19, this repo includes a temporary workaround: a top-level `.npmrc` with `legacy-peer-deps=true` to allow installation on Vercel.

Longer-term fixes: upgrade or remove `react-helmet-async`, or align React to a supported version for that package.