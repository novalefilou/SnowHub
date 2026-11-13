/* ============================================================
   SNOW HUB - content. Single source of truth for every page.
   Only facts found in the supplied files are written here.
   Edit this file to change texts; the pages update themselves.
   ============================================================ */
window.HUB = {
  updates: [
    { date: '13 Nov 2026', text: 'SNOW HUB goes live with five sections: Home, My Lab, My Projects, My Socials and Downloads.' },
    { date: '13 Nov 2026', text: 'SWLauncher Beta V1 is ready to download. Open Downloads, then Beta.' },
    { date: '9 Nov 2026', text: 'SWLAUNCHER Blue Edition V1.1: date of the latest source files in the Beta package.' },
    { date: '1 Nov 2026', text: 'Four lab experiments written: AdminAbuseVirus, LoveMe, PCOptimizer and WindowsExe.' }
  ],

  /* ---------- MY LAB: presentation + harmless web demo only ---------- */
  lab: [
    { id: 'adminabusevirus', name: 'AdminAbuseVirus', category: 'Slideshow prank', demo: true,
      summary: 'A PowerShell prank that shows four images fullscreen with music, then reveals it was a joke.',
      image: 'assets/previews/raining-tacos-2.jpg', alt: 'One of the four Raining Tacos images used by the prank',
      tags: ['PowerShell', 'Images', 'Music', 'Raining Tacos'],
      meta: [['Category', 'Slideshow prank'], ['Internal title', 'Raining Tacos'], ['Made with', 'PowerShell and Windows Forms'], ['Platform', 'Windows']],
      details: ['Starts with a Yes / No popup, and a second popup if the answer is No.',
        'Plays a music track while four images appear fullscreen, 2 seconds each, for 2 cycles.',
        'Pressing P exits the prank at any time.',
        'Ends with a final reveal screen.'] },
    { id: 'loveme', name: 'LoveMe', category: 'Dialog prank', demo: true,
      summary: 'A tiny Windows dialog that asks “Do you love me?” and reacts to your answer.',
      tags: ['Batch', 'PowerShell', 'Dialog'],
      meta: [['Category', 'Dialog prank'], ['Made with', 'Batch and PowerShell'], ['Platform', 'Windows']],
      details: ['Shows a Yes / No question: “Do you love me? :)”.',
        'Yes brings a friendly reply. No brings a warning message.',
        'In the original batch file, answering No also starts a 5-second shutdown. For that reason the script is not published, and the web demo never does it.'] },
    { id: 'pcoptimizer', name: 'PCOptimizer', category: 'Fake optimizer', demo: true,
      summary: 'A fake PC optimizer: a loading window, then a series of fullscreen visual scenes.',
      tags: ['PowerShell', 'Simulation', 'Sound'],
      meta: [['Category', 'Fake optimizer'], ['Made with', 'PowerShell'], ['Platform', 'Windows']],
      details: ['A loading window runs for 10 seconds.',
        'Fullscreen scenes follow: a black screen with random fake code, a blue error screen, and a restarting screen. All are visual simulations.',
        'Sounds play between scenes, then everything closes by itself with a final reveal.'] },
    { id: 'windowsexe', name: 'WindowsExe', category: 'Screen simulation', demo: true,
      summary: 'WINDOWS.EXE, a consented visual simulation of a desktop falling apart, lasting about 47 seconds.',
      tags: ['PowerShell', 'Simulation', 'Fullscreen'],
      meta: [['Category', 'Screen simulation'], ['Made with', 'PowerShell and Windows Forms'], ['Platform', 'Windows'], ['Length', 'About 47 seconds']],
      details: ['Asks for one clear confirmation before anything goes fullscreen.',
        'Copies the desktop in memory only, with no image written to disk, then makes it break into blocks.',
        'Then shows 6 seconds of green code, a 7-second scan with fake alerts every 900 ms, and a fake blue screen.',
        'Ends with a final reveal. Alt+F4 closes the whole simulation. No Windows file is modified or deleted.'] }
  ],

  /* ---------- MY PROJECTS ---------- */
  projects: [
    { id: 'swlauncher', name: 'SWLAUNCHER', category: 'Roblox', version: 'Blue Edition V1.1',
      summary: 'SWLAUNCHER is a Windows application designed to explore and customize game textures through a simple interface.',
      image: 'assets/images/swlauncher.png', alt: 'SWLAUNCHER window showing the Roblox texture browser with ArrowFarCursor.png selected',
      tags: ['Windows', 'Textures', 'Roblox', 'Geometry Dash', 'SWPaint'],
      meta: [['Version', 'Blue Edition V1.1'], ['Category', 'Roblox'], ['Platform', 'Windows'], ['Built with', 'Python, PySide6 and Pillow'], ['Interface', 'French']],
      details: ['Texture Manager: one window with a folder tree, an image list and a preview.',
        'Roblox texture browser: finds the Roblox client textures folder and lists its images, with a search box and a folder picker.',
        'Geometry Dash support: the same browser opens the Geometry Dash icons folder.',
        'SWPaint integration: send any texture to SWPaint, then apply the result back.',
        'SWPaint editor: brush, eraser, eyedropper, colour, width, zoom, undo and redo. New, open and export as PNG.',
        'Image replacement: replace a texture with an image from your PC.',
        'Original texture restoration: backups are kept in a SWLAUNCHER_Backups folder so the original can be restored.',
        'Image preview: shows name, format, dimensions, size and path of the selected image.'] },
    { id: 'geometry-dash-launcher', name: 'Geometry Dash Launcher', category: 'Geometry Dash', version: 'Included in SWLAUNCHER V1.1',
      summary: 'The Geometry Dash page of SWLAUNCHER: browse the game’s icon textures, edit them in SWPaint, replace them or restore the originals.',
      tags: ['Windows', 'Textures', 'Geometry Dash'],
      meta: [['Version', 'Included in SWLAUNCHER V1.1'], ['Category', 'Geometry Dash'], ['Platform', 'Windows']],
      details: ['Opens the Geometry Dash icons folder from the default Steam install path when it exists.',
        'Choose another folder if the game is installed somewhere else.',
        'Search, browse and preview images in the folder tree.',
        'Edit a texture with SWPaint, replace it from your PC, or restore the original.'] }
  ],

  /* ---------- DOWNLOADS ---------- */
  downloads: {
    categories: [
      { id: 'beta', name: 'Beta', desc: 'Early builds to test before they become releases.',
        items: [{
          id: 'swlauncher-beta-v1', name: 'SWLauncher Beta V1', version: 'Beta V1', format: 'ZIP',
          summary: 'Early beta release of SWLauncher.',
          file: 'downloads/SWLauncherBetaV1.zip', filename: 'SWLauncherBetaV1.zip', size: '10.0 KB (10,209 bytes)',
          sha256: 'a652a4e4847e1a2e98d0f8f16b219059c2c9a7d0fd66cc1b0014aa6523e4bfa3',
          contents: ['app.py: the SWLAUNCHER application', 'run.bat: installs the requirements and starts the app', 'build_exe.bat: builds an EXE with PyInstaller', 'requirements.txt: PySide6 and Pillow', 'README.md: notes about the package'],
          requirements: ['Windows with Python 3.10 or newer', 'PySide6 6.7 or newer and Pillow 10 or newer, installed by run.bat']
        }] },
      { id: 'releases', name: 'Releases', desc: 'Stable versions of my software.', items: [] },
      { id: 'tools', name: 'Tools', desc: 'Small utilities.', items: [] },
      { id: 'resources', name: 'Resources', desc: 'Images, packs and other files.', items: [] }
    ]
  }
};
