const path = require("path");
const fs = require("fs");

const workerDir = path.resolve(__dirname, "src", "workers");

const files = fs.readdirSync(workerDir);
const workerFiles = files
    .map((file) => file.split(".").slice(0, -1).join("."))
    .reduce((files, filename) => {
        files[filename] = {
            import: path.resolve(workerDir, filename + ".ts"),
            filename: "workers/" + filename + ".js",
        };

        return files;
    }, {});

module.exports = {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
        extensions: [".ts", ".js"],
    },
    devtool: "source-map",
    entry: {
        main: "./main.ts",
        preload: {
            import: "./preload.ts",
            filename: "preload.js",
        },
        ...workerFiles,
    },
    target: "electron-main",
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            { test: /\.(cs|html)$/, loader: "ignore-loader" },
        ],
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        clean: true,
    },
    externals: [
        {
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            nock: "commonjs2 nock",
            "mock-aws-s3": "commonjs2 mock-aws-s3",
            "aws-sdk": "commonjs2 aws-sdk",
            "better-sqlite3": "commonjs2 better-sqlite3",
            tedious: "commonjs2 tedious",
            mysql2: "commonjs2 mysql2",
            pg: "commonjs2 pg",
            "pg-query-stream": "commonjs2 pg-query-stream",
            oracledb: "commonjs2 oracledb",
            mysql: "commonjs2 mysql",
            npm: "npm",
            typeorm: "commonjs typeorm",
        },
        "cctx",
        "sqlite3",
    ],
};
