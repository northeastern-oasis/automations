const path = require('path');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: {
        'individual_signup': './src/functions/individual_signup/individual_signup.ts',
        'group_signup': './src/functions/group_signup/group_signup.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
    output: {
        filename: '[name].js',
        library: 'handler',
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, 'dist'),
    },
}