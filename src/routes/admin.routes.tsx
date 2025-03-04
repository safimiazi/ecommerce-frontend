 export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: "DASHBOARD"
    },
    {
        name: "agent",
        children: [
            {
                name: "List",
                path: "list",
                element: "AGENT_LIST"
            },
            {
                name: "Add",
                path: "add",
                element: "AGENT_ADD"
            },
        
        ]
    },
]



