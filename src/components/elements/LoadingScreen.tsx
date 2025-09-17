import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Assicurati che il componente sia montato prima di accedere al tema
    useEffect(() => {
        setMounted(true);
    }, []);

    // Evita problemi di idratazione
    if (!mounted) {
        return (
            <div>
                <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="black" />
            </div>
        );
    }

    // Determina il colore basato sul tema
    const ringColor = resolvedTheme === 'dark' ? 'white' : 'black';

    return (
        <div>
            <Ring 
                size="40" 
                stroke="5" 
                bgOpacity="0" 
                speed="2" 
                color={ringColor} 
            />
        </div>
    );
};

export default LoadingScreen;