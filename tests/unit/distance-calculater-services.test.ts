import { applyHaversineFormula, calculateDistance, toRadius } from "../../src/services/distances-calculator-service"

describe("calcularDistancia", () => {
    it("calcule a distencia entre Rio de Janeiro e Vitória em Km", () => {
        const rio = {
            lat: -22.8093,
            long: -43.2237

        }

        const saoPaulo = {
            lat: -23.5505,
            long: -46.6333
        }

        const distancia = calculateDistance(rio, saoPaulo)

        console.log("a distancia é ", distancia);
        expect(distancia).toBeGreaterThan(306);
        expect(distancia).toBeLessThan(415);
        expect(distancia).toBe(Math.round(distancia))


    })

    it("calcule em milhsa", () => {
        const rio = {
            lat: -22.8093,
            long: -43.2237

        }

        const saoPaulo = {
            lat: -23.5505,
            long: -46.6333
        }

        const distancia = calculateDistance(rio, saoPaulo, true)

        expect(distancia).toBeGreaterThan(215);
        expect(distancia).toBeLessThan(230);


    })
})

describe("applyHaversineFormula", () => {
    it("deve aplicar a fórmula corretamente com valores simulados", () => {
        const lat1 = toRadius(-23.5505);
        const lat2 = toRadius(-22.9068);
        const dLat = toRadius(-22.9068 - -23.5505);
        const dLon = toRadius(-43.1729 - -46.6333);
        const radius = 6371;

        const result = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);

        expect(Math.round(result)).toBeGreaterThan(350);
        expect(Math.round(result)).toBeLessThan(370);
    });
})
