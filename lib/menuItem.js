export const menuItems = [
    {
        label: 'File',
        submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
    },
    {
        label: 'show',
        submenu: [
            {
                role: 'toggleDevTools',
            }
        ]
    }
];
