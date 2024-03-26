import terser from "@rollup/plugin-terser";

export default {
  input: "./jsa.js",
  output: {
    file: "./jsa.min.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    terser({
      compress: {
        unused: false,
        collapse_vars: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
  ],
};
