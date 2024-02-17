# obs-replay-save-notification

# Installation

### Pre-requisites
- You'll need to install Node & Electron for this script to work.
- Next, you'll need OBS (duh), and enable the WebSocket server. Once your credentials are generated, you can edit the electron-script.js file with the address and password for a successful connection.


### Autostarter
Once your script is setup and working, you can indepently run OBS and the script to verify the working of the script.
To combine it all together, you'll need to get the autostarter script from OBS Studio forums and create a batch file to run the electron script. Finally point autostarter to the batch file to ensure it runs on startup.
You're done!

Now when you start OBS, the script will run automatically and also start the replay buffer for you!

### Recommended
It is recommended to use this with the "Beep on replay buffer save" script to also get an audio notification of the replay buffer being saved.
