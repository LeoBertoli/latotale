:root {
    --orange: #E57C23;
    --red: #D11A2A;
    --blue: #1A5276;
    --bg-dark: #0a0a0a;
    --bg-surface: #141414;
    --text-light: #ffffff;
    --text-dim: #888888;
    --transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

/* Loader */
#loader {
    position: fixed; inset: 0; background: #000; z-index: 9999;
    display: flex; justify-content: center; align-items: center;
}
.spinner {
    width: 40px; height: 40px; border: 2px solid #222;
    border-top-color: var(--orange); border-radius: 50%;
    animation: spin 1s linear infinite; margin-bottom: 15px;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Header */
header {
    position: fixed; top: 0; width: 100%; z-index: 1000; padding: 25px 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent);
}
nav { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.4rem; font-weight: 900; letter-spacing: 2px; }
.orange { color: var(--orange); }
.nav-links { display: flex; list-style: none; gap: 35px; }
.nav-links a {
    color: var(--text-dim); text-decoration: none; font-size: 0.8rem;
    text-transform: uppercase; letter-spacing: 1px; transition: var(--transition);
}
.nav-links a:hover { color: var(--text-light); }

.btn-cta {
    background: var(--orange); color: #fff; padding: 12px 28px;
    border-radius: 2px; text-decoration: none; font-weight: 700;
    font-size: 0.75rem; letter-spacing: 1px; transition: var(--transition);
}
.btn-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(229, 124, 35, 0.3); }

/* Hero */
#hero { height: 250vh; position: relative; }
#canvas-container { position: sticky; top: 0; width: 100%; height: 100vh; z-index: 1; }
.hero-overlay {
    position: absolute; top: 0; width: 100%; height: 100vh;
    display: flex; align-items: center; z-index: 2; pointer-events: none;
}
h1 { font-size: clamp(3rem, 10vw, 6rem); font-weight: 900; line-height: 0.9; }
.outline { color: transparent; -webkit-text-stroke: 1px #fff; }
.sub-hero { font-size: 1.1rem; color: var(--text-dim); max-width: 500px; margin: 20px 0; }
.scroll-hint { font-size: 0.7rem; letter-spacing: 4px; color: var(--orange); margin-top: 40px; }

/* Sections */
section { padding: 120px 0; background: var(--bg-dark); }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.tag { color: var(--orange); font-weight: 700; font-size: 0.75rem; letter-spacing: 3px; }
h2 { font-size: 2.8rem; margin: 20px 0; font-weight: 800; }
.stats { display: flex; gap: 40px; margin-top: 40px; }
.stat-item { font-weight: 700; font-size: 1.1rem; }

.image-placeholder {
    height: 500px; background: #1a1a1a; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid #222; position: relative;
}

/* Services */
.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 60px; }
.service-card {
    background: var(--bg-surface); padding: 50px; border-radius: 4px;
    position: relative; transition: var(--transition);
}
.service-card:hover { transform: translateY(-10px); background: #1f1f1f; }
.card-accent { position: absolute; top: 0; left: 0; width: 100%; height: 4px; }
.orange-bg { background: var(--orange); }
.red-bg { background: var(--red); }
.blue-bg { background: var(--blue); }

/* Contact */
.contact-card { display: grid; grid-template-columns: 1fr 1fr; background: var(--bg-surface); border-radius: 8px; overflow: hidden; }
.contact-info { padding: 60px; }
.contact-list { list-style: none; margin: 40px 0; }
.contact-list li { margin-bottom: 20px; color: var(--text-dim); }
.map-container { background: #1a1a1a; display: flex; align-items: center; justify-content: center; min-height: 400px; }
.map-link { color: var(--orange); text-decoration: none; font-size: 0.8rem; border: 1px solid var(--orange); padding: 10px 20px; margin-top: 20px; display: inline-block; }

footer { padding: 60px 0; text-align: center; color: #444; font-size: 0.8rem; border-top: 1px solid #111; }

@media (max-width: 768px) {
    .grid-2, .contact-card { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    h1 { font-size: 3.5rem; }
}
