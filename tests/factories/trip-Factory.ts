import { faker } from "@faker-js/faker";
import { Trip, ServiceClass, AffiliateStatus } from "../../src/protocols";

export function generateTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    code: faker.string.alphanumeric(6),
    origin: {
      lat: -22.8093,
      long: -43.2237,
    },
    destination: {
      lat: -23.5505,
      long: -46.6333,
    },
    miles: false,
    plane: faker.vehicle.model(),
    service: ServiceClass.ECONOMIC,
    affiliate: AffiliateStatus.GOLD,
    date: "2025-05-12",
    ...overrides,
  };
}