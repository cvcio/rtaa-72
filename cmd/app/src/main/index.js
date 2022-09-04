'use strict';

import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { debugInfo } from 'electron-util';

import log from 'electron-log';
import Store from 'electron-store';
import WindowStateManager from 'electron-window-state';

const isDevelopment = process.env.NODE_ENV !== 'production';

log.transports.console.level = process.env.LOG_LEVEL || 'debug';
log.transports.file.level = process.env.LOG_LEVEL || 'debug';
log.transports.file.appName = 'cwt';

log.info(`Logging to: ${log.transports.file.fileName}`);
log.info('Starting RTAA-72 Application -- ENV:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');

// set log as default console
Object.assign(console, log.functions);

log.debug(debugInfo().split('\n'));

// Set the application's name
app.name = 'RTAA-72';
app.version = require('../../package.json').version;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
]);

// Create a new instance of the WindowStateManager
// and pass it the name and the default properties
const mainWindowState = new WindowStateManager({
	defaultWidth: 1024,
	defaultHeight: 768,
	minWidth: 1024,
	minHeight: 768
});

async function createWindow () {
	// Set Application Settings fi not exists
	const appSettings = new Store({ name: 'rtaa-72' });

	if (!appSettings.has('frame')) appSettings.set('frame', true);
	if (!appSettings.has('autoHideMenuBar')) appSettings.set('autoHideMenuBar', false);
	if (!appSettings.has('fullscreenWindowTitle')) appSettings.set('fullscreenWindowTitle', true);
	if (!appSettings.has('webgl')) appSettings.set('webgl', true);
	if (!appSettings.has('autoUpdate')) appSettings.set('autoUpdate', true);

	// Create the browser window.
	const defaultWindowOptions = {
		title: `RTAA-72 (${require('../../package.json').version})`,
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		show: true,
		frame: appSettings.get('frame'),
		autoHideMenuBar: !appSettings.get('frame') ? true : appSettings.get('autoHideMenuBar'),
		titleBarStyle: (process.platform === 'darwin') ? 'hidden' : 'hiddenInset',
		// icon: '',
		fullscreenable: true,
		fullscreen: false,
		fullscreenWindowTitle: appSettings.get('fullscreenWindowTitle'),
		webPreferences: {
			webgl: true,
			// Use pluginOptions.nodeIntegration, leave this alone
			// See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
		}
	};

	log.info('[Window Options]', defaultWindowOptions);
	// Create BrowserWindow with options
	const win = new BrowserWindow(defaultWindowOptions);

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol('app');
		// Load the index.html when not in development
		win.loadURL('app://./index.html');
	}

	win.once('ready-to-show', () => {
		log.debug('Event [ready-to-show]');
		win.show();
		mainWindowState.manage(win);

		/*
		if (isDev) return;
		// Initialize the autoUpdater module fi autoUpdate
		if (appSettings.get('autoUpdate')) {
			setTimeout(() => {
				updater.update();
			}, 15000);
		}
		*/
	});

	win.on('close', (event) => {
		log.debug('Event [close]');
		event.preventDefault();

		// Save the current window state
		// mainWindowState.saveState(win);
	});

	win.on('closed', () => {
		log.debug('Event [closed]');
		// First remove the active Listeners from the Window and then close
		win.removeAllListeners();
	});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	log.debug('Event [window-all-closed]');
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	log.debug('Event [activate]');
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	log.debug('Event [ready]');
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		try {
			await installExtension(VUEJS_DEVTOOLS);
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}
	createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
