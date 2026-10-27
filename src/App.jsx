import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Icon from './Icon'
import { artist, songs, socials, lyrics, spotifyEmbed } from './data'

gsap.registerPlugin(ScrollTrigger)
const NOTES = ['♪', '♫', '♩', '♬', '𝄞']
const rnd = gsap.utils.random

export default function App() {
  const root = useRef(null)
  const [menu, setMenu] = useState(false)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Hero intro
      gsap.from('.ch', { yPercent: 120, rotate: 8, opacity: 0, stagger: 0.045, duration: 1.1, ease: 'power4.out', delay: 0.2 })
      gsap.from('.hero-sub, .hero-cta', { y: 30, opacity: 0, stagger: 0.15, delay: 1, duration: 0.9, ease: 'power3.out' })
      // Floating notes
      gsap.utils.toArray('.note').forEach((n) => {
        gsap.fromTo(n, { y: '105vh', opacity: 0 }, { y: '-25vh', opacity: rnd(0.25, 0.7), duration: rnd(9, 18), repeat: -1, delay: rnd(0, 9), ease: 'none' })
        gsap.to(n, { x: rnd(-40, 40), rotate: rnd(-45, 45), duration: rnd(2, 4), yoyo: true, repeat: -1, ease: 'sine.inOut' })
      })
      // Equalizer
      gsap.utils.toArray('.bar').forEach((b) =>
        gsap.to(b, { scaleY: rnd(0.15, 1), duration: rnd(0.3, 0.9), yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' }))
      // Vinyl + marquee
      gsap.to('.vinyl', { rotation: 360, duration: 9, repeat: -1, ease: 'none' })
      gsap.to('.marquee-track', { xPercent: -50, duration: 28, repeat: -1, ease: 'none' })
      gsap.to('.vinyl-wrap', { y: -70, ease: 'none', scrollTrigger: { trigger: '#about', scrub: 0.6, start: 'top bottom', end: 'bottom top' } })
      // Scroll reveals
      gsap.utils.toArray('.reveal').forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.set('.card', { y: 80, opacity: 0 })
      ScrollTrigger.batch('.card', { start: 'top 90%', once: true, onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' }) })
      gsap.utils.toArray('.lyric').forEach((l) =>
        gsap.fromTo(l, { opacity: 0.15, x: -30 }, { opacity: 1, x: 0, ease: 'none', scrollTrigger: { trigger: l, start: 'top 85%', end: 'top 50%', scrub: true } }))
      gsap.from('.social', { scale: 0, rotate: -90, stagger: 0.08, duration: 0.7, ease: 'back.out(2)', scrollTrigger: { trigger: '#connect', start: 'top 80%' } })
    })
    // Cursor glow, only for mouse users
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const x = gsap.quickTo('.glow', 'x', { duration: 0.6 }), y = gsap.quickTo('.glow', 'y', { duration: 0.6 })
      const move = (e) => { x(e.clientX); y(e.clientY) }
      window.addEventListener('pointermove', move)
      return () => window.removeEventListener('pointermove', move)
    })
    return () => mm.revert()
  }, [])

  const go = () => setMenu(false)
  const title = artist.name.split(' ')

  return (
    <div ref={root}>
      <div className="glow" aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="logo" onClick={go}>ER<span>♪</span></a>
        <button className="burger" aria-label="Toggle menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><i /><i /></button>
        <nav className={menu ? 'open' : ''} aria-label="Main">
          {['about', 'music', 'words', 'connect'].map((s) => <a key={s} href={`#${s}`} onClick={go}>{s}</a>)}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="notes" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => <span key={i} className="note" style={{ left: `${(i * 6.4) % 96}%`, fontSize: `${rnd(1.2, 3)}rem` }}>{NOTES[i % NOTES.length]}</span>)}
          </div>
          <p className="eyebrow">Songwriter · Lyricist · Storyteller</p>
          <h1 aria-label={artist.name}>
            {title.map((w, wi) => (
              <span className="word" key={wi} aria-hidden="true">
                {[...w].map((c, i) => <span className="mask" key={i}><span className="ch">{c}</span></span>)}
              </span>
            ))}
          </h1>
          <p className="hero-sub">{artist.tagline}</p>
          <a className="btn hero-cta" href="#music">Listen now</a>
          <div className="eq" aria-hidden="true">{Array.from({ length: 36 }, (_, i) => <i className="bar" key={i} />)}</div>
        </section>

        <section id="about" className="section about">
          <div className="vinyl-wrap reveal" aria-hidden="true"><div className="vinyl"><b /></div></div>
          <div className="reveal">
            <h2>The story</h2>
            {artist.bio.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </section>

        <section id="music" className="section">
          <h2 className="reveal">Songs I've written</h2>
          <div className="grid">
            {songs.map((s, i) => (
              <article className="card" key={s.title}>
                <span className="num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.note}</p>
                <small>{s.year}</small>
              </article>
            ))}
          </div>
          <div className="player reveal">
            <iframe title="Spotify player" src={spotifyEmbed} width="100%" height="352" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" style={{ border: 0, borderRadius: 16 }} />
          </div>
        </section>

        <section id="words" className="section lyrics">
          <h2 className="reveal">In his words</h2>
          {lyrics.map((l) => <blockquote className="lyric" key={l}>{l}</blockquote>)}
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">{Array.from({ length: 2 }, (_, k) => <span key={k}>♪ Write it true ♫ Sing it loud ♩ Let it breathe ♬ Start again&nbsp;</span>)}</div>
        </div>

        <section id="connect" className="section connect">
          <h2 className="reveal">Let's write something</h2>
          <p className="reveal">Follow along, stream the songs, or book a writing session.</p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.name}><a className="social" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}><Icon name={s.icon} /></a></li>
            ))}
          </ul>
          <a className="btn reveal" href={`mailto:${artist.email}`}>{artist.email}</a>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} {artist.name}. All rights reserved.</footer>
    </div>
  )
}
