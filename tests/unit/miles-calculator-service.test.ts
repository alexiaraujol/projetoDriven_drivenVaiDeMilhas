import { calculateMiles } from "../../src/services/miles-calculator-service";
import * as distanceService from "../../src/services/distances-calculator-service";
import { generateTrip } from "../factories/trip-Factory";
import { AffiliateStatus, ServiceClass } from "protocols";

jest.mock("../../src/services/distances-calculator-service", () => {
    return {
        calculateDistance: jest.fn()
    };
})

describe("calculo de Milhas", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deve retornar 0 se a viagem for paga com milhas", () => {
        const trip = generateTrip({ miles: true });
        const result = calculateMiles(trip);
        expect(result).toBe(0);
    })

    it("deve calcular milhas para classe ECONIMIC + GOLD fora de maio", () => {
        const trip = generateTrip({
            miles: false,
            service: ServiceClass.ECONOMIC,
            affiliate: AffiliateStatus.GOLD,
            date: "2025-04-13"
        });

        (distanceService.calculateDistance as jest.Mock).mockReturnValue(1000)

        const result = calculateMiles(trip);
        expect(result).toBe(1250);


    })

    it("deve aplicar bônus de mês de aniversário (maio)", () => {
        const trip = generateTrip({
            miles: false,
            service: ServiceClass.ECONOMIC,
            affiliate: AffiliateStatus.BRONZE,
            date: "2025-05-20",
        });

        (distanceService.calculateDistance as jest.Mock).mockReturnValue(1000);

        const result = calculateMiles(trip);

        // 1000 base + 10% maio = 1100
        expect(result).toBe(1100);
    });

})