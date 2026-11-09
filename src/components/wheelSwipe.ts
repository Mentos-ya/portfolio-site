// Распознавание жестов тачпада и колеса для ленты «Сделал для себя»: один жест — один шаг.
//
// Тачпад Mac после того, как палец оторвался, ещё около секунды шлёт затухающие толчки (инерцию).
// Их нельзя принимать за новые свайпы — иначе лента пролетает несколько карточек. Но и новый свайп,
// начатый поверх инерции, нельзя глушить — иначе лента застревает (Илья 09.11.2026: «застревают
// от свайпов»). Браузер не говорит, где палец, а где инерция, поэтому новый жест узнаём сами:
//  - тишина дольше GAP;
//  - палец развернулся в другую сторону или ушёл на прокрутку страницы (и наоборот);
//  - шла инерция, а скорость снова растёт три толчка подряд и в RISE раз выше дна — это новый свайп.
// Инерцию узнаём по почерку: она затухает ровно — пять пар толчков подряд скорость падает на 3–40%
// за пару. Палец так не двигается: медленное неровное перетаскивание то разгоняется, то тормозит,
// и без этой проверки сходило за несколько свайпов. Ещё один признак — скорость после ровного хода
// разом упала втрое: так бывает, когда пальцы легли на тачпад и оборвали инерцию.
// Скорость считаем в пикселях за миллисекунду: браузер иногда склеивает два толчка в один.
// Дно берём по средней из трёх последних скоростей (медиане): один случайный крошечный толчок
// иначе опускает его почти до нуля, и обычная дрожь сходит за новый свайп.
// Пороги проверены на записях настоящих жестов из библиотеки wheel-gestures (лицензия MIT).

export type WheelVerdict = {
  // гасить ли событие, чтобы браузер сам не прокручивал ленту и не сбивал её плавный ход
  prevent: boolean
  // на сколько карточек сдвинуть ленту: -1 назад, 1 вперёд, 0 — ничего
  step: -1 | 0 | 1
}

const GAP = 200 // мс тишины — точно новый жест
const AXIS_AT = 6 // столько пикселей нужно, чтобы понять, вбок жест или вниз
const FIRE_AT = 24 // столько пикселей вбок — и лента листает
const REARM_AFTER = 200 // мс после шага, раньше которых новый свайп поверх инерции не засчитываем
const RISE = 1.6 // во сколько раз скорость нового свайпа выше дна инерции
const RISE_EXTRA = 0.75 // пикс/мс — запас над дрожью толчков (6 пикселей, если толчки идут каждые 8 мс)
const DECAY_MIN = 0.6 // инерция: скорость пары толчков к прошлой паре — от 0,6…
const DECAY_MAX = 0.97 // …до 0,97
const DECAY_PAIRS = 5 // столько пар подряд затухают ровно — значит, это инерция
const SMOOTH_DOWN = 0.7 // «ровный ход»: каждый толчок медленнее прошлого не больше чем на 30%…
const SMOOTH_UP = 1.1 // …и быстрее не больше чем на 10%
const CUT = 3 // пальцы легли на тачпад — скорость разом упала втрое и больше

export function createWheelSwipe() {
  let lastT = -Infinity
  let axis: 'x' | 'y' | null = null
  let sumX = 0
  let sumY = 0
  let dir = 0 // куда идёт жест по горизонтали
  let fired = false // шаг в этом жесте уже сделан
  let firedAt = 0
  let armed = false // после шага пошла инерция или её оборвали пальцы
  let trough = Infinity // самая малая скорость с тех пор
  let speeds: number[] = [] // три последние скорости
  let pair: number[] = [] // толчки текущей пары
  let lastPair = 0 // средняя скорость прошлой пары
  let decays: number[] = [] // во сколько раз менялась скорость от пары к паре

  const start = () => {
    axis = null
    sumX = 0
    sumY = 0
    dir = 0
    fired = false
    armed = false
    trough = Infinity
    speeds = []
    pair = []
    lastPair = 0
    decays = []
  }

  // dx, dy — сдвиг толчка в пикселях, t — время толчка в мс
  return (dx: number, dy: number, t: number): WheelVerdict => {
    const ax = Math.abs(dx)
    const ay = Math.abs(dy)
    // Пустые толчки (так Windows сообщает, что палец оторвался) ничего не значат
    if (ax === 0 && ay === 0) return { prevent: axis === 'x', step: 0 }

    const dt = t - lastT
    const v = ax / Math.min(50, Math.max(8, dt))
    const sign = Math.sign(dx)

    let fresh = dt > GAP
    if (!fresh && axis === 'x') {
      if (sign !== 0 && dir !== 0 && sign !== dir && ax >= 4 && ax > ay) fresh = true
      else if (ay >= 4 && ay > 2 * ax) fresh = true
      else if (fired && armed && sign === dir && t - firedAt >= REARM_AFTER && speeds.length >= 2) {
        const a = speeds[speeds.length - 2]
        const b = speeds[speeds.length - 1]
        if (a <= b && b <= v && v > a && (a + b + v) / 3 >= RISE * trough + RISE_EXTRA) fresh = true
      }
    } else if (!fresh && axis === 'y' && ax >= 4 && ax > 2 * ay) fresh = true
    lastT = t
    if (fresh) start()

    sumX += dx
    sumY += dy
    if (axis === null && Math.abs(sumX) + Math.abs(sumY) >= AXIS_AT) {
      axis = Math.abs(sumX) > Math.abs(sumY) ? 'x' : 'y'
      dir = axis === 'x' ? Math.sign(sumX) : 0
    }

    // Пальцы оборвали инерцию: до толчка шёл ровный ход, а скорость разом упала вдвое
    const smoothBefore =
      speeds.length === 3 &&
      [speeds[1] / speeds[0], speeds[2] / speeds[1]].every((k) => k >= SMOOTH_DOWN && k <= SMOOTH_UP)
    const cutOff = smoothBefore && v <= median(speeds) / CUT
    speeds.push(v)
    if (speeds.length > 3) speeds.shift()

    // Почерк инерции: скорость пар толчков ровно затухает
    pair.push(v)
    if (pair.length === 2) {
      const now = (pair[0] + pair[1]) / 2
      if (lastPair > 0) decays.push(now / lastPair)
      if (decays.length > DECAY_PAIRS) decays.shift()
      lastPair = now
      pair = []
    }
    const coasting = decays.length === DECAY_PAIRS && decays.every((k) => k >= DECAY_MIN && k <= DECAY_MAX)

    let step: WheelVerdict['step'] = 0
    if (axis === 'x' && !fired && Math.abs(sumX) >= FIRE_AT) {
      fired = true
      firedAt = t
      step = sumX > 0 ? 1 : -1
    } else if (fired) {
      if (!armed && (coasting || cutOff)) armed = true
      if (armed) trough = Math.min(trough, median(speeds))
    }

    return { prevent: axis === 'x' || (axis === null && ax > ay), step }
  }
}

// Средняя из трёх (медиана): не замечает одного выброса
function median(xs: number[]) {
  if (xs.length === 0) return 0
  const a = [...xs].sort((p, q) => p - q)
  return a[Math.floor(a.length / 2)]
}
