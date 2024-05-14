const { app, BrowserWindow,BrowserView,ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");
const windowOptions = require("./utils/window")

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    vibrancy: 'sidebar',
    visualEffectState: "active",
    useContentSize:true,
    show: false
  });
  const view = new BrowserView()
 
  

  // view.webContents.loadURL('https://electronjs.org')
  // const child = new BrowserWindow({ parent: win,frame:false,width:560,x:200,y:30,height:560,hasShadow:false })
  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }

  win.once('ready-to-show', () => {
    console.log(win.getBrowserViews())
    win.show()
    // child.show()
    // const {x,y,width,height} = win.getContentBounds()
    // win.setBrowserView(view)
    // view.setBounds({ x:188, y: 12, width: width-200, height: height-24 })
    // view.setAutoResize({horizontal:true,vertical:true})
    // view.setBackgroundColor("#ffffff")
    // view.setRoundedCorners(20);
    // view.webContents.loadURL('https://electronjs.org')
    // view.loadURL("https://www.google.com")
    // view.show()
  })

  ipcMain.on('reloadUrl', (event,url) => {
    console.log(url)
    // const webContents = event.sender
    // const win = BrowserWindow.fromWebContents(webContents)
    // win.setTitle(title)
    view.webContents.loadURL(url)
  })
  

}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});