const OBSWebSocket = require('obs-websocket-js').default;
const { app, BrowserWindow } = require('electron');

class OBSReplayBufferListener {
    constructor(obsAddress, obsPassword) {
        this.obs = new OBSWebSocket();
        this.obsAddress = obsAddress;
        this.obsPassword = obsPassword;

        this.obs.on('error', (err) => {
            console.error(`Error connecting to OBS WebSocket: ${err.message}`);
        });

        app.whenReady().then(() => {
            setTimeout(() => {
                this.createWindow();
                this.initWebSocket();
            }, 5000);
        });
    }

    initWebSocket() {
        this.obs.connect('ws://127.0.0.1:4455', 'Ay20as1ei23nSaYi').then(() => {
            console.log('Connected to OBS WebSocket');
            this.obs.call('StartReplayBuffer')
            this.obs.on('ReplayBufferSaved', () => {
                this.showConfirmationMessage();
            });
        }).catch((error) => {
            console.error(`Error connecting to OBS WebSocket: ${error}`);
            console.log(this.obsAddress);
        });
    }

    createWindow() {

        const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;

        // Assuming you have at least two monitors, change the index to 1 for the second monitor
        const { x, y } = require('electron').screen.getAllDisplays()[1].workArea;


        this.win = new BrowserWindow({
            width: 50,
            height: 50,
            show: false,
            alwaysOnTop: true,
            frame: false,
            x: x + 1850,
            y: y + 20,
            backgroundColor: '#00FF00',
            webPreferences: {
                nodeIntegration: true,
            },
        });

        this.win.loadFile('index.html'); // Create a simple HTML file for the window content
    }

    showConfirmationMessage() {
        this.win.webContents.send('show-message', 'Replay Buffer saved event detected!');
        this.win.show();
        setTimeout(() => {
            this.hideConfirmationMessage();
        }, 800);
    }

    hideConfirmationMessage() {
        this.win.hide();
    }
}

const obsAddress = 'ws://192.168.0.42:4455'; // Replace with your OBS WebSocket address
const obsPassword = 'Ay20as1ei23nSaYi'; // Replace with your OBS WebSocket password

const obsListener = new OBSReplayBufferListener(obsAddress, obsPassword);

app.on('ready', () => {
    // Do nothing, Electron app initialization
});
