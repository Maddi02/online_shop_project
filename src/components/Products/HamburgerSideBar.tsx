import {ChevronLast, ChevronFirst} from "lucide-react"
import {useContext, createContext, useState, ReactNode} from "react"
import {useNavigate} from "react-router-dom";



type SidebarContextType = {
    expanded: boolean
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

type SidebarProps = {
    children: ReactNode;
}


const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export default function Sidebar({children}: SidebarProps) {
    const navigate = useNavigate()
       const handleHomeNavigation = () => {
        navigate('/home');
    };
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="fixed inset-y-0 left-0 z-20 flex">
            <aside
                className={`bg-white overflow-y-auto transition-width duration-300 ease-in-out ${
                    expanded ? 'w-64' : 'hidden' // Adjust these widths as needed
                }`}
            >
                <div className="p-4 pb-2 flex justify-between items-center" onClick={handleHomeNavigation}>
                    <img
                        src="src/assets/madiizne.png"
                        className={`overflow-hidden transition-all ${
                            expanded ? "w-32" : "w-0"
                        }`}
                        alt="Logo"

                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst/> : <ChevronLast/>}
                    </button>
                </div>

                {expanded && (
                    <SidebarContext.Provider value={{expanded, setExpanded}}>
                        <ul className="flex-1">{children}</ul>
                    </SidebarContext.Provider>
                )}

            </aside>

            {!expanded && (
                <button
                    onClick={() => setExpanded(true)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto" // Adjust styles as needed
                >
                    <ChevronLast/>
                </button>
            )}
        </div>
    )
}


type SidebarItemProps = {
    icon: ReactNode
    text: string
    alert: boolean
    onClick: () => void
}

export function SidebarItem({icon, text, onClick}: SidebarItemProps) {
    const sidebarContext = useContext(SidebarContext);

    if (!sidebarContext) {
        throw new Error("SidebarItem must be used within a SidebarContext.Provider");
    }

    const {expanded, setExpanded} = sidebarContext;
    const handleClick = () => {
        if (onClick) onClick();
        setExpanded(false);
    };
    return (
        <li onClick={handleClick}
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group`}>
            {icon}
            <span
                className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
        {text}
      </span>
            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}