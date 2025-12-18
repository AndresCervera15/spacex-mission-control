import { describe, it, expect } from "vitest";
import {
  getLaunchStatus,
  getStatusColor,
  getStatusIcon,
  getStatusLabel,
  calculateSuccessRate,
} from "@/lib/utils/status";

describe("Status Utils", () => {
  describe("getLaunchStatus", () => {
    it('should return "upcoming" for upcoming launches', () => {
      const status = getLaunchStatus(null, true);
      expect(status).toBe("upcoming");
    });

    it('should return "success" for successful launches', () => {
      const status = getLaunchStatus(true, false);
      expect(status).toBe("success");
    });

    it('should return "failure" for failed launches', () => {
      const status = getLaunchStatus(false, false);
      expect(status).toBe("failure");
    });

    it('should return "failure" when success is null and not upcoming', () => {
      const status = getLaunchStatus(null, false);
      expect(status).toBe("failure");
    });
  });

  describe("getStatusColor", () => {
    it("should return success colors for success status", () => {
      const colors = getStatusColor("success");
      expect(colors).toContain("success-500");
    });

    it("should return failure colors for failure status", () => {
      const colors = getStatusColor("failure");
      expect(colors).toContain("failure-500");
    });

    it("should return upcoming colors for upcoming status", () => {
      const colors = getStatusColor("upcoming");
      expect(colors).toContain("upcoming-500");
    });
  });

  describe("getStatusIcon", () => {
    it("should return checkmark for success", () => {
      const icon = getStatusIcon("success");
      expect(icon).toBe("✓");
    });

    it("should return X for failure", () => {
      const icon = getStatusIcon("failure");
      expect(icon).toBe("✕");
    });

    it("should return clock for upcoming", () => {
      const icon = getStatusIcon("upcoming");
      expect(icon).toBe("◷");
    });
  });

  describe("getStatusLabel", () => {
    it('should return "Success" for success status', () => {
      const label = getStatusLabel("success");
      expect(label).toBe("Success");
    });

    it('should return "Failed" for failure status', () => {
      const label = getStatusLabel("failure");
      expect(label).toBe("Failed");
    });

    it('should return "Upcoming" for upcoming status', () => {
      const label = getStatusLabel("upcoming");
      expect(label).toBe("Upcoming");
    });
  });

  describe("calculateSuccessRate", () => {
    it("should calculate success rate correctly", () => {
      const rate = calculateSuccessRate(90, 100);
      expect(rate).toBe(90);
    });

    it("should return 0 for zero total", () => {
      const rate = calculateSuccessRate(0, 0);
      expect(rate).toBe(0);
    });

    it("should round to one decimal place", () => {
      const rate = calculateSuccessRate(89, 100);
      expect(rate).toBe(89);
    });

    it("should handle partial percentages", () => {
      const rate = calculateSuccessRate(1, 3);
      expect(rate).toBe(33.3);
    });

    it("should return 100 for perfect success rate", () => {
      const rate = calculateSuccessRate(50, 50);
      expect(rate).toBe(100);
    });
  });
});
