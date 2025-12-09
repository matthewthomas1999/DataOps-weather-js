import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data') //finds data file - current working directory
const JSON_FILE = path.join(DATA_DIR, 'weather.json')
const CSV_FILE = path.join(DATA_DIR, 'weather_log.cvs')

describe('Weather Data Tests', () => {
    test('Weather.json exists', () => { // it === test (alias of one another)
        expect(fs.existsSync(JSON_FILE)).toBe(true) //checks JSON file exists
    })
    test( 'weather.json has required keys',() => {
        const raw = fs.readFileSync(JSON_FILE, 'utf8') //reads with utf8
        expect(raw.trim().length).toBeGreaterThan(0) //checks file is Not empty

        const data = JSON.parse(raw)
        expect(data).toHaveProperty('main')
        expect(data).toHaveProperty('weather')
        expect(data.weather[0]).toHaveProperty('description')
        expect(data).toHaveProperty('_last_updated_utc')

        expect(new Date(data._last_updated_utc).toISOString()).toBe(data._last_updated_utc)

    })
    test('CSV log exists and has header', () => {
        expect(fs.existsSync(CSV_FILE)).toBe(true)

        const csvContent = fs.readFileSync(CSV_FILE, 'utf8')
        const lines = csvContent.trim().split('\n') //splits at new lne
        const header = lines[0].split(',') //splits at comma

        expect(header).toEqual(['timestamp', 'city', 'temperature', 'description'])
        expect(lines.length).toBeGreaterThan(1)

        const firstDataRow = lines[1].split(',')
        expect(!isNaN(parseFloat(firstDataRow[2]))).toBe(true)
    })
})