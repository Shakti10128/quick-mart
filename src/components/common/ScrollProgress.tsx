import { useEffect, useState } from "react";

const ScrollProgress = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // window.scrollY gives the number of pixels the user has scrolled vertically from the top.
            const scrollTop = window.scrollY;
            /*document.documentElement.scrollHeight gives the total height of the page, including the scrollable part. */
            // window.innerHeight is the visible height of the window.
            // Subtracting them gives the total scrollable distance.
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollPercentage(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div
                className="h-1 bg-black transition-all duration-150"
                style={{ width: `${scrollPercentage}%` }}
            ></div>
        </div>
    );
};

export default ScrollProgress;
