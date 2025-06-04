class CustomFetchWasmPlugin {
        apply(compiler) {
                const {
                        web: { FetchCompileAsyncWasmPlugin },
                        wasm: { EnableWasmLoadingPlugin }
                } = compiler.webpack;
                EnableWasmLoadingPlugin.setEnabled(compiler, "fetch");
                new FetchCompileAsyncWasmPlugin().apply(compiler);
        }
}

/** @type {import("../../../../").Configuration} */
module.exports = {
        target: "web",
        module: {
                rules: [
                        {
                                test: /\.wat$/,
                                loader: "wast-loader",
                                type: "webassembly/async"
                        }
                ]
        },
        output: {
                webassemblyModuleFilename: "[id].wasm",
                wasmLoading: new CustomFetchWasmPlugin()
        },
        experiments: {
                asyncWebAssembly: true
        }
};
