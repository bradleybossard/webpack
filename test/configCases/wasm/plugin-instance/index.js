it("should work with plugin instance", function() {
        return import("./module").then(module => {
                const result = module.run();
                expect(result).toBe(84);
        });
});
