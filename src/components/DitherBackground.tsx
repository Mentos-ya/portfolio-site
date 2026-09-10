'use client'

import { useEffect, useRef } from 'react'

// Фон всего сайта: свечение, переведённое в два цвета крупным пиксельным растром.
// Стоит на месте, страница прокручивается поверх. Пятно тянется к курсору, растр под курсором сгущается.
// При «уменьшить движение» замирает только собственное движение фона — реакция на мышь остаётся.
// Яркость зажата между 0.05 и 0.75: сплошных синих пятен и пустых мест нет, пиксели видны везде.
// Синий растра разбавлен кремовым на треть — бледнее акцентного, чтобы не спорить с текстом.
// Комментарии держим снаружи шейдера: русские буквы внутри него ломают сборку на части видеокарт
const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
const FRAG = `
precision highp float;
uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform float u_hover;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}
float b2(vec2 a){a=floor(a);return fract(a.x*.5+a.y*a.y*.75);}
float b4(vec2 a){return b2(.5*a)*.25+b2(a);}
float b8(vec2 a){return b4(.5*a)*.25+b2(a);}
void main(){
  float cell=3.;
  vec2 px=floor(gl_FragCoord.xy/cell);
  vec2 uv=(px*cell-.5*u_res)/u_res.y;
  float t=u_time*.25;
  vec2 ctr=mix(vec2(.3*sin(t),.12*cos(t*.7)),u_mouse,.6*u_hover);
  float v=.74-length(uv-ctr)*.95+.35*(fbm(uv*2.5+vec2(t*.3,0.))-.5);
  v+=.18*sin(uv.x*6.+t*2.)*sin(uv.y*5.-t);
  vec2 dm=uv-u_mouse;
  v+=.3*u_hover*exp(-dot(dm,dm)*9.);
  v=clamp(v,.05,.75);
  vec3 cream=vec3(.969,.941,.859), blue=mix(vec3(.122,.2,1.),cream,.35);
  gl_FragColor=vec4(v>b8(px)?blue:cream,1.);
}`

export default function DitherBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext('webgl', { antialias: false })
    if (!canvas || !gl) return // WebGL нет — остаётся кремовый фон страницы

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s))
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uHover = gl.getUniformLocation(prog, 'u_hover')

    // Пиксели растра крупные, поэтому холст считается в обычной плотности — вчетверо дешевле
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    // Мышь в координатах шейдера; реальное положение догоняется плавно
    const m = { x: 0, y: 0, tx: 0, ty: 0, h: 0, th: 0 }
    const onMove = (e: PointerEvent) => {
      m.tx = (e.clientX - window.innerWidth / 2) / window.innerHeight
      m.ty = (window.innerHeight / 2 - e.clientY) / window.innerHeight
      if (m.h < 0.01) { m.x = m.tx; m.y = m.ty } // первое наведение — без пролёта через весь экран
      m.th = 1
    }
    const onOut = (e: PointerEvent) => { if (!e.relatedTarget) m.th = 0 }
    const onUp = (e: PointerEvent) => { if (e.pointerType === 'touch') m.th = 0 }
    const onBlur = () => { m.th = 0 }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerout', onOut)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('blur', onBlur)

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0
    const draw = (now: number) => {
      m.x += (m.tx - m.x) * 0.09
      m.y += (m.ty - m.y) * 0.09
      m.h += (m.th - m.h) * 0.06
      gl.uniform1f(uTime, still ? 2 : (now - start) / 1000)
      gl.uniform2f(uMouse, m.x, m.y)
      gl.uniform1f(uHover, m.h)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    // Скрытая вкладка — стоп, видеокарта не греется
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 h-full w-full pointer-events-none"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
