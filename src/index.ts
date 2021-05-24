import ErrorCorrectLevel from './ErrorCorrectLevel'
import QRCode from './QRCode'

interface Rect {
    x: number
    y: number
    width: number
    height: number
}

/**
 * Generate QR code.
 * @param level Error correction level, one of L (7%), M (15%), Q (25%) or H (30%) defaults to L.
 * @param version QR Size, 1 to 40, defaults to -1 (autodetect).
 * @returns SVG string.
 * @author Johan Nordberg <code@johan-nordberg.com>
 */
export default function generate(text: string, level: 'L' | 'M' | 'Q' | 'H' = 'L', version = -1) {
    const qr = new QRCode(version, ErrorCorrectLevel[level])

    qr.addData(text)
    qr.make()

    const size = qr.modules.length
    const rows: Rect[][] = Array(size)
        .fill(null)
        .map(() => [])

    for (const [y, row] of qr.modules.entries()) {
        let rect: Rect | undefined
        for (const [x, on] of row.entries()) {
            if (on) {
                if (!rect) rect = {x, y, width: 0, height: 1}
                rect.width++
            } else {
                if (rect && rect.width > 0) {
                    rows[y].push(rect)
                }
                rect = undefined
            }
        }
        if (rect && rect.width > 0) {
            rows[y].push(rect)
        }
    }

    for (let i = 0; i < size - 1; i++) {
        const row = rows[i]
        const next = rows[i + 1]
        for (const rt of next) {
            for (const rr of row) {
                if (rr.width === rt.width && rr.x === rt.x) {
                    rt.y = rr.y
                    rt.height += rr.height
                    row.splice(row.indexOf(rr), 1)
                }
            }
        }
    }

    const svg: string[] = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">`]
    for (const rects of rows) {
        for (const {x, y, width, height} of rects) {
            svg.push(`<rect x="${x}" y="${y}" width="${width}" height="${height}"/>`)
        }
    }
    svg.push('</svg>')

    return svg.join('')
}
