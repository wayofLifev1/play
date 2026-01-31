/* FILENAME: pipah-ecosystem.js 
   USAGE: <script src="pipah-ecosystem.js"></script>
*/

(function() {
    // --- 1. CONFIGURATION: YOUR APPS LIST ---
    // Icons are set to look in the "./icon/" folder relative to your index.html
    const myApps = [
        { 
            name: "Pipah Cookies", 
            url: "https://pipahcookies.web.app", 
            icon: "./icon/pipahapp.png" 
        },
        { 
            name: "Mukmin Pro", 
            url: "https://waktusolat.app", 
            icon: "./icon/mukmin.png" 
        },
        { 
            name: "Pro Sketch", 
            url: "#", // REPLACE WITH REAL URL
            icon: "./icon/sketch.png" 
        },
        { 
            name: "SuperTube", 
            url: "#", // REPLACE WITH REAL URL
            icon: "./icon/supertube.png"
        },
        { 
            name: "Task Manager", 
            url: "#", // REPLACE WITH REAL URL
            icon: "./icon/task.png"
        },
        { 
            name: "Brain Arcade", 
            url: "#", // REPLACE WITH REAL URL
            icon: "./icon/Brain.png" // Note: Capital 'B' as per your image
        },
        { 
            name: "RS Portal", 
            url: "#", // REPLACE WITH REAL URL
            icon: "./icon/rsportal.png"
        }
    ];

    // --- 2. INJECT CSS STYLES ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* Button Style */
        .pe-btn {
            width: 38px; height: 38px;
            border-radius: 12px;
            background: rgba(255,255,255,0.5);
            border: 1px solid rgba(255,255,255,0.4);
            color: #333;
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 18px; cursor: pointer; transition: 0.2s;
            -webkit-tap-highlight-color: transparent;
            margin-right: 8px;
        }
        .pe-btn:active { transform: scale(0.92); background: rgba(0,0,0,0.05); }

        /* Modal Overlay */
        .pe-overlay {
            position: fixed; inset: 0;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            z-index: 99999;
            display: none; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.3s;
        }
        .pe-overlay.active { display: flex; opacity: 1; }

        /* Folder Container */
        .pe-folder {
            width: 300px;
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 20px 50px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.5);
            border-radius: 34px;
            padding: 24px;
            transform: scale(0.85); transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            font-family: sans-serif;
        }
        .pe-overlay.active .pe-folder { transform: scale(1); }

        /* App Grid */
        .pe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px 10px; }
        
        /* App Item */
        .pe-item { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
        .pe-item:active { opacity: 0.6; transform: scale(0.95); }
        
        /* Icon Box */
        .pe-icon-box {
            width: 62px; height: 62px; border-radius: 16px; overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08); background: white;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; font-weight: bold; color: #888;
        }
        .pe-icon-box img { width: 100%; height: 100%; object-fit: cover; }
        
        /* App Name */
        .pe-name { font-size: 11px; font-weight: 500; color: #333; text-align: center; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    `;
    document.head.appendChild(style);

    // --- 3. INJECT MODAL HTML ---
    const modalHtml = `
    <div id="pe-modal-root" class="pe-overlay">
        <div class="pe-folder">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding:0 4px;">
                <span style="font-size:14px; font-weight:600; color:#555;">More Creations</span>
                <div onclick="PipahEco.close()" style="background:#e0e0e0; color:#555; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; cursor:pointer;">✕</div>
            </div>
            <div id="pe-grid-target" class="pe-grid"></div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // --- 4. EXPOSE FUNCTIONS ---
    window.PipahEco = {
        open: function() {
            const grid = document.getElementById('pe-grid-target');
            const currentUrl = window.location.href;
            grid.innerHTML = '';
            
            myApps.forEach(app => {
                // Auto-Hide current app from grid (unless it is a placeholder #)
                if(currentUrl.includes(app.url) && app.url !== '#') return;

                let content = '';
                // Logic: Try to load the image from ./icon/filename.png
                if(app.icon) {
                    content = `<img src="${app.icon}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                               <div style="display:none; width:100%; height:100%; background:linear-gradient(135deg, #f0f0f0, #e0e0e0); align-items:center; justify-content:center;">${app.name.charAt(0)}</div>`;
                } else {
                    content = `<div style="width:100%; height:100%; background:linear-gradient(135deg, #f0f0f0, #e0e0e0); display:flex; align-items:center; justify-content:center;">${app.name.charAt(0)}</div>`;
                }

                grid.innerHTML += `
                    <div class="pe-item" onclick="window.open('${app.url}', '_blank')">
                        <div class="pe-icon-box">${content}</div>
                        <span class="pe-name">${app.name}</span>
                    </div>`;
            });
            document.getElementById('pe-modal-root').classList.add('active');
        },
        
        close: function() { document.getElementById('pe-modal-root').classList.remove('active'); },

        init: function() {
            const targets = document.querySelectorAll('#pipah-ecosystem-btn');
            targets.forEach(target => {
                const btn = document.createElement('button');
                btn.className = 'pe-btn';
                // Grid Icon
                btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
                btn.onclick = this.open;
                target.parentNode.replaceChild(btn, target);
            });
        }
    };

    document.getElementById('pe-modal-root').addEventListener('click', function(e) {
        if(e.target === this) PipahEco.close();
    });

    if (document.readyState === 'loading') {  
        document.addEventListener('DOMContentLoaded', PipahEco.init);
    } else {  
        PipahEco.init();
    }
})();
