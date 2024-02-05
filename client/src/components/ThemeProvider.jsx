import { useSelector } from "react-redux";

export default function ThemeProvider({children}) {
    const { theme } = useSelector((state) => state.theme);
    return (
        <div className={theme}>
            <div className="text-gray-800 bg-white dark:text-gray-100 dark:bg-gray-900 min-h-screen">
                {children}
            </div>
        </div>
    )
}