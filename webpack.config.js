const path = require('path');

module.exports = {
    entry: {
        'individual_signup': './src/functions/individual_signup/individual_signup.ts',
        'team_signup': './src/functions/team_signup/team_signup.ts'
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