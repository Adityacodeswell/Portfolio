// If you use Next.js (app router), uncomment the next line:
// 'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

// ---------- EDIT HERE ----------
const IMG_DIR = '/assets/images/';
const PHONE_FILE = 'Retro Handheld Console Loading Screen';
const START_BG: [number, number, number] = [245, 245, 247]; // stage colour before it fades to black (use [0,0,0] for a fully dark start)
const SKILLS = [
  { label: 'DESIGN', file: 'Pixel Figma Tile with Cursor', cap: 'FIG. 01 / VISUAL LANGUAGE', copy: 'FORM / COLOUR / VISUAL THINKING',
    icon: 'M2 2h12v12H2zM4 4v8h8V4zM5 10l5-5 2 2-5 5H5z' },
  { label: 'CODE', file: 'Pixel Art Coding Windows with Database and Cloud', cap: 'FIG. 02 / DIGITAL BUILD', copy: 'HTML / CSS / JS / FULL STACK',
    icon: 'M5 4L1 8l4 4v-2L3 8l2-2zM11 4v2l2 2-2 2v2l4-4zM7 13h2l1-10H8z' },
  { label: 'AI TOOLS', file: 'Pixel-Art AI Processor Chip', cap: 'FIG. 03 / MACHINE INTELLIGENCE', copy: 'PROMPT / MODEL / GENERATIVE WORKFLOWS',
    icon: 'M8 1l1.5 5.5L15 8l-5.5 1.5L8 15 6.5 9.5 1 8l5.5-1.5z' },
  { label: 'TECH', file: 'Pixel Art Circuit Brain Icon', cap: 'FIG. 04 / COMPUTATIONAL SYSTEMS', copy: 'SENSORS / LOGIC / ENGINEERING',
    icon: 'M1 1h6v6H1zm8 0h6v6H9zM1 9h6v6H1zm8 0h6v6H9zM3 3v2h2V3zm8 0v2h2V3zM3 11v2h2v-2zm8 0v2h2v-2z' },
];
// --------------------------------

const src = (name: string) => encodeURI(`${IMG_DIR}${name}.png`);
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const cubicInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function WhyHireMe({ id = 'why-hire-me' }: { id?: string }) {
  const seqRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // ---------- PART A: phone scroll ----------
  useEffect(() => {
    const seq = seqRef.current, stage = stageRef.current, dev = devRef.current;
    const glow = glowRef.current, veil = veilRef.current, img = imgRef.current;
    if (!seq || !stage || !dev || !glow || !veil || !img) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SC = { x: 0.493, y: 0.345, w: 0.532, h: 0.318 }; // LCD position inside the phone image
    let AR = 1199 / 1312, W = 0, H = 0, Sf = 1, ox = 0, oy = 0, cur = 0, raf = 0;
    let last = performance.now();

    const layout = () => {
      if (img.naturalWidth) AR = img.naturalWidth / img.naturalHeight;
      const vw = window.innerWidth, vh = window.innerHeight;
      H = Math.min(vh * 0.78, (vw * 0.92) / AR);
      W = H * AR;
      dev.style.width = `${W}px`;
      dev.style.height = `${H}px`;
      dev.style.marginLeft = `${-W / 2}px`;
      dev.style.marginTop = `${-H / 2}px`;
      dev.style.transformOrigin = `${SC.x * W}px ${SC.y * H}px`;
      Sf = Math.max(vw / (SC.w * W), vh / (SC.h * H)) * 1.12;
      ox = SC.x * W - W / 2;
      oy = SC.y * H - H / 2;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const r = seq.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < -50 || r.top > vh + 50) return; // off-screen: do nothing
      const tgt = clamp(-r.top / (r.height - vh));
      cur = reduce ? tgt : cur + (tgt - cur) * (1 - Math.exp(-dt * 8));
      const a = smoother(seg(cur, 0, 0.4));      // straighten + grow
      const z = cubicInOut(seg(cur, 0.4, 0.86)); // zoom into the screen
      const s = lerp(0.56, 1, a) * Math.pow(Sf, z);
      dev.style.transform = `translate3d(${-ox * z}px, ${-oy * z}px, 0) rotateZ(${lerp(-5, 0, a)}deg) rotateY(${lerp(-24, 0, a)}deg) scale(${s})`;
      glow.style.opacity = String(0.55 * (1 - seg(cur, 0.4, 0.7)));
      const d = seg(cur, 0.55, 0.9);
      stage.style.background = `rgb(${START_BG.map((v) => Math.round(v * (1 - d))).join(',')})`;
      const v = seg(cur, 0.8, 0.96);
      veil.style.opacity = String(v);
      dev.style.visibility = v >= 1 ? 'hidden' : 'visible';
    };

    layout();
    img.addEventListener('load', layout);
    window.addEventListener('resize', layout);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      img.removeEventListener('load', layout);
      window.removeEventListener('resize', layout);
    };
  }, []);

  // ---------- PART B: pinned skills console ----------
  useEffect(() => {
    const sk = skillsRef.current, wrap = wrapRef.current;
    if (!sk || !wrap) return;
    const upd = () => {
      const r = sk.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - window.innerHeight));
      setActive(Math.min(3, Math.floor(p * 4)));
    };
    const fit = () => {
      const pin = wrap.parentElement;
      const pinStyle = pin ? window.getComputedStyle(pin) : null;
      const horizontalPadding = pinStyle
        ? parseFloat(pinStyle.paddingLeft) + parseFloat(pinStyle.paddingRight)
        : 0;
      const availableWidth = (pin?.clientWidth ?? window.innerWidth) - horizontalPadding;
      const scale = Math.min(
        1,
        (window.innerHeight - 90) / wrap.offsetHeight,
        availableWidth / wrap.offsetWidth,
      );
      wrap.style.transform = `scale(${scale})`;
    };
    const onResize = () => { fit(); upd(); };
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(fit);
    fit();
    upd();
    return () => {
      window.removeEventListener('scroll', upd);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const go = (i: number) => {
    const sk = skillsRef.current;
    if (!sk) return;
    const r = sk.getBoundingClientRect();
    const d = r.height - window.innerHeight;
    window.scrollTo({ top: window.scrollY + r.top + ((i + 0.5) / 4) * d, behavior: 'smooth' });
  };

  const lvl = 100 - active * 8;
  const cur = SKILLS[active];

  return (
    <section id={id} aria-label="Why hire me">
      <style>{CSS}</style>
      {/* PART A */}
      <div ref={seqRef} className="whm-seq">
        <div ref={stageRef} className="whm-stage" style={{ background: `rgb(${START_BG.join(',')})` }}>
          <div ref={glowRef} className="whm-glow" />
          <div ref={devRef} className="whm-dev">
            <img ref={imgRef} src={src(PHONE_FILE)} alt="Handheld retro console with a pixel-art loading screen" />
          </div>
          <div ref={veilRef} className="whm-veil" />
        </div>
      </div>

      <div className="whm-intro">
        <h2>Why hire me<span>?</span></h2>
      </div>

      {/* PART B */}
      <div ref={skillsRef} className="whm-skills">
        <div className="whm-pin">
          <div className="whm-brand"><span>ADITYA.K</span><span>PERSONAL SYSTEM MENU /// 01</span></div>
          <div ref={wrapRef} className="whm-wrap">
            <div className="whm-tabs">
              {SKILLS.map((s, i) => (
                <button key={s.label} type="button" aria-label={s.label} className={`whm-tab ${i === active ? 'on' : ''}`} onClick={() => go(i)}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d={s.icon} /></svg>
                </button>
              ))}
            </div>
            <div className="whm-arr" aria-hidden="true"><span>◀</span><span>▶</span></div>

            <div className="whm-screen">
              <i className="whm-corner tl" /><i className="whm-corner tr" /><i className="whm-corner bl" /><i className="whm-corner br" />
              <header className="whm-sh"><h3>PLAYER CAN</h3><div className="whm-dither" /></header>
              <div className="whm-cn">
                <div className="whm-ml">
                  {SKILLS.map((s, i) => (
                    <button key={s.label} type="button" className={`whm-mi ${i === active ? 'on' : ''}`} aria-current={i === active} onClick={() => go(i)}>
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="whm-dt">
                  <div className="whm-art">
                    {SKILLS.map((s, i) => (
                      <img key={s.file} src={src(s.file)} alt={`${s.label} pixel illustration`} className={i === active ? 'on' : ''} />
                    ))}
                  </div>
                  <div className="whm-cap">{cur.cap}</div>
                  <div className="whm-cp">{cur.copy}</div>
                </div>
              </div>
            </div>

            <div className="whm-bw">
              <div className="whm-bat" style={{ '--lvl': lvl / 100 } as CSSProperties}><i>POWER {lvl}%</i></div>
            </div>
            <div className="whm-hint">SCROLL TO NAVIGATE THE SYSTEM ↓</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const CUT = 'polygon(0 14px,14px 0,calc(100% - 14px) 0,100% 14px,100% calc(100% - 14px),calc(100% - 14px) 100%,14px 100%,0 calc(100% - 14px))';
const TABCUT = 'polygon(0 24%,18% 0,82% 0,100% 24%,100% 100%,0 100%)';
const CSS = `
.whm-seq{position:relative;height:560vh}
.whm-stage{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;perspective:2800px}
.whm-glow{position:absolute;left:50%;top:50%;width:80vmin;height:80vmin;margin:-40vmin 0 0 -40vmin;background:radial-gradient(closest-side,rgba(255,31,42,.38),rgba(255,31,42,0));opacity:.55}
.whm-dev{position:absolute;left:50%;top:50%}
.whm-dev img{display:block;width:100%;height:100%;max-width:none;user-select:none;-webkit-user-drag:none;pointer-events:none}
.whm-veil{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;z-index:3}
.whm-intro{background:#fff;color:#000;padding:clamp(28px,5vh,64px) clamp(24px,8vw,128px) clamp(64px,9vh,112px)}
.whm-intro h2{max-width:1200px;margin:0 auto;font-family:var(--font-display,sans-serif);font-size:clamp(2rem,4.8vw,5rem);font-weight:800;line-height:1;letter-spacing:-.06em;color:#000}
.whm-intro h2 span{color:#ff3b30}

.whm-skills{--sr:#ff1f2a;position:relative;height:calc(100svh + 280vh);background:#000;color:var(--sr);font-family:'Press Start 2P',ui-monospace,monospace}
.whm-skills button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.whm-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:20px 22px}
.whm-brand{position:absolute;left:4vw;right:4vw;top:calc(env(safe-area-inset-top,0px) + 16px);display:flex;justify-content:space-between;gap:12px;font-size:9px;letter-spacing:.08em;white-space:nowrap}
.whm-wrap{width:min(100%,800px);position:relative;flex:none}
.whm-tabs{height:76px;display:flex;align-items:flex-end;gap:6px;padding-left:40px;position:relative;z-index:3}
.whm-tab{box-sizing:content-box;width:88px;height:66px;background:#000;border:5px solid #4a0d12;border-bottom:0;clip-path:${TABCUT};position:relative;display:grid;place-items:center;color:#7d1017;transition:.2s}
.whm-tab:before{content:"";position:absolute;inset:5px 5px 0;border:3px solid #4a0d12;clip-path:${TABCUT};pointer-events:none}
.whm-tab svg{width:34px;height:34px;fill:currentColor}
.whm-tab.on{height:78px;color:var(--sr);border-color:var(--sr);transform:translateY(4px)}
.whm-tab.on:before{border-color:var(--sr)}
.whm-arr{position:absolute;top:22px;left:0;right:0;display:flex;justify-content:space-between;pointer-events:none;font-size:28px}
.whm-screen{box-sizing:content-box;position:relative;background:#000;border:7px solid #000;outline:5px solid var(--sr);outline-offset:-12px;min-height:450px;padding:18px 25px 24px;clip-path:${CUT}}
.whm-screen:after{content:"";position:absolute;pointer-events:none;inset:10px;border:3px solid var(--sr);clip-path:${CUT}}
.whm-sh{height:70px;background:var(--sr);color:#000;display:flex;align-items:center;padding:0 18px;position:relative;overflow:hidden;margin:0 0 18px}
.whm-sh h3{margin:0;font-size:clamp(14px,3.6vw,30px);font-weight:400;letter-spacing:-.06em;white-space:nowrap;position:relative;z-index:1}
.whm-dither{position:absolute;right:15px;top:0;width:145px;height:100%;opacity:.75;background-image:radial-gradient(#000 2px,transparent 2px);background-size:9px 9px;-webkit-mask-image:linear-gradient(90deg,transparent,#000);mask-image:linear-gradient(90deg,transparent,#000)}
.whm-cn{display:grid;grid-template-columns:43% 57%;min-height:310px;position:relative;z-index:1}
.whm-ml{border-right:5px solid #4a0d12;padding:4px 15px 0 0;display:flex;flex-direction:column;justify-content:space-evenly}
.whm-mi{font-size:clamp(11px,1.8vw,18px);text-align:left;opacity:.5;padding:8px 9px;border:4px solid transparent;margin-left:-5px}
.whm-mi.on{opacity:1;border-color:var(--sr)}
.whm-dt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:0 14px;min-width:0}
.whm-art{position:relative;width:min(100%,300px);height:230px}
.whm-art img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:contain;opacity:0}
.whm-art img.on{opacity:1;animation:whm-pop .4s steps(5) both}
@keyframes whm-pop{from{transform:scale(.55);opacity:0}to{transform:none;opacity:1}}
.whm-cap{font-size:8px;letter-spacing:.08em;text-align:center;opacity:.6}
.whm-cp{font-size:8px;line-height:1.8;text-align:center}
.whm-corner{box-sizing:content-box;position:absolute;width:25px;height:25px;border:0 solid var(--sr);z-index:4}
.whm-corner.tl{top:16px;left:16px;border-width:5px 0 0 5px}
.whm-corner.tr{top:16px;right:16px;border-width:5px 5px 0 0}
.whm-corner.bl{bottom:16px;left:16px;border-width:0 0 5px 5px}
.whm-corner.br{bottom:16px;right:16px;border-width:0 5px 5px 0}
.whm-bw{display:flex;justify-content:center;margin-top:25px}
.whm-bat{box-sizing:content-box;width:250px;height:74px;border:7px solid var(--sr);position:relative;background:#1c0406;padding:6px}
.whm-bat:before{content:"";position:absolute;left:4px;top:4px;bottom:4px;width:calc((100% - 8px) * var(--lvl,1));background:linear-gradient(#ff3b45 0 48%,#c4121b 48% 100%);transition:width .5s}
.whm-bat:after{content:"";position:absolute;right:-21px;top:17px;width:14px;height:30px;background:var(--sr)}
.whm-bat i{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:8px;font-style:normal;color:#fff;text-shadow:2px 2px 0 #000;z-index:1;white-space:nowrap}
.whm-hint{text-align:center;font-size:8px;opacity:.6;margin-top:22px;letter-spacing:.1em}
@media(max-width:650px){
 .whm-brand{font-size:7px}.whm-pin{padding:20px 14px}.whm-tabs{height:59px;padding-left:22px;gap:3px}
 .whm-tab{width:clamp(48px,13vw,76px);height:51px;border-width:3px}.whm-tab.on{height:61px}.whm-tab svg{width:26px;height:26px}
 .whm-screen{box-sizing:border-box;width:100%;padding:13px 14px 18px;min-height:390px;border-width:5px}.whm-sh{height:56px;margin-bottom:12px;padding:0 12px}
 .whm-cn{grid-template-columns:minmax(0,39%) minmax(0,61%);min-height:270px}.whm-ml{min-width:0;padding-right:8px;border-right-width:3px}
 .whm-mi{max-width:100%;white-space:nowrap;font-size:clamp(6px,2.2vw,11px);padding:12px 3px;border-width:3px;margin-left:-3px}
 .whm-dt{padding:0 2px;overflow:hidden}.whm-art{width:100%;height:clamp(130px,42vw,180px)}.whm-cap,.whm-cp{font-size:6px}.whm-bat{width:min(190px,calc(100vw - 96px));height:58px}.whm-bat:after{top:11px;height:24px}
}
@media(prefers-reduced-motion:reduce){.whm-art img.on{animation:none}.whm-tab,.whm-bat:before{transition:none}}
`;
