import { afterEach, describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
	let cache: Cache;

	afterEach(() => {
		cache?.stopReapLoop();
	});

	test("returns cached value if it exists", () => {
		cache = new Cache(1000);

		cache.add("foo", 123);
		const result = cache.get<number>("foo");

		expect(result).toBe(123);
	});

	test("returns undefined for missing key", () => {
		cache = new Cache(1000);

		const result = cache.get("missing");

		expect(result).toBeUndefined();
	});

	test("removes entries older than the interval", async () => {
		cache = new Cache(10);

		cache.add("old", "value");

		await new Promise((r) => setTimeout(r, 25));

		const result = cache.get("old");

		expect(result).toBeUndefined();
	});

	test.concurrent.each([
		["a", 1],
		["b", 2],
		["c", 3],
	])("expires key %s", async (key, value) => {
		const cache = new Cache(5);

		cache.add(key, value);

		await new Promise((r) => setTimeout(r, 20));

		expect(cache.get(key)).toBeUndefined();
		cache.stopReapLoop();
	});
});
