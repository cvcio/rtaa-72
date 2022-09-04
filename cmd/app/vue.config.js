'use strict';

const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	runtimeCompiler: true,
	productionSourceMap: false,
	css: {
		sourceMap: true
	},
	lintOnSave: process.env.NODE_ENV !== 'production',
	parallel: true,
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		devServer: {
			headers: { 'Access-Control-Allow-Origin': '*' }
		},
		devtool: 'source-map',
		name: 'RTAA-72',
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		performance: {
			hints: false
		}
	},
	chainWebpack: config => {
		config.module.rule('eslint').use('eslint-loader').options({
			fix: true
		});
		// config.plugin('CompressionPlugin').use(CompressionPlugin);
		config.plugin('VuetifyLoaderPlugin').tap(args => [{
			match (originalTag, { kebabTag, camelTag, path, component }) {
				if (kebabTag.startsWith('core-')) {
					return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`];
				}
			}
		}]);
	},
	pluginOptions: {
		electronBuilder: {
			chainWebpackRendererProcess: config => {},
			productName: 'RTAA-72',
			copyright: 'Dimitris Papaevagelou @andefiend <dimitris.papaevagelou@andefined.com>',
			outputDir: 'dist/electron',
			customFileProtocol: 'app://./',
			disableMainProcessTypescript: false,
			nodeIntegration: true,
			mainProcessFile: 'src/main/index.js',
			mainProcessWatch: ['src/main/**/*'],
			builderOptions: {
				directories: {
					output: 'dist/electron'
				},
				fileAssociations: {},
				linux: {
					icon: 'public/icons/512x512.png',
					// artifactName: '${productName}-${version}-${arch}.${ext}',
					target: [
						'deb',
						'AppImage',
						'rpm'
					],
					extraResources: []
				},
				win: {
					icon: 'public/icons/icon.ico',
					target: [
						{
							target: 'nsis',
							arch: ['x64']
						}
					],
					extraResources: []
				},
				mac: {
					icon: 'public/icons/icon.icns',
					darkModeSupport: true,
					category: 'public.app-category.developer-tools',
					extraResources: []
				},
				nsis: {
					oneClick: false,
					allowElevation: true,
					allowToChangeInstallationDirectory: true,
					installerIcon: 'public/icons/icon.ico',
					uninstallerIcon: 'public/icons/icon.ico',
					installerHeaderIcon: 'public/icons/icon.ico',
					createDesktopShortcut: true,
					createStartMenuShortcut: true,
					shortcutName: 'icon'
				}
			}
		}
	},
	outputDir: 'dist/web'
};
