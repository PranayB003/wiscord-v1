import React, { useCallback, useEffect, useRef, useState } from "react";
import ScrollDownFab from "../components/ScrollDownFab";

const isScrolledToBottom = (element) => {
    return (
        element?.scrollHeight - element?.clientHeight - element?.scrollTop <= 14
    );
};

const useAutoScrollDown = (containerRef, dependencies = []) => {
    const forceScroll = useRef(false);
    const [displayFab, setDisplayFab] = useState(false);

    const container = containerRef.current;
    const scrolledDown = isScrolledToBottom(container);

    const scrollDownImmediate = useCallback(() => {
        const children = container.children;
        const lastChildElement = children[children.length - 1];
        if (lastChildElement) {
            lastChildElement.scrollIntoView({
                behaviour: "smooth",
            });
            setDisplayFab(false);
        }
    }, [container]);

    const forceScrollDown = useCallback(() => {
        forceScroll.current = true;
    }, [forceScroll]);

    useEffect(() => {
        if (scrolledDown || forceScroll.current) {
            scrollDownImmediate();
        } else {
            setDisplayFab(true);
        }
        forceScroll.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceScroll, scrollDownImmediate, ...dependencies]);

    useEffect(() => {
        containerRef.current?.addEventListener("scroll", (event) => {
            if (isScrolledToBottom(containerRef.current)) {
                setDisplayFab(false);
            }
        });
    }, [containerRef]);

    const ScrollButton = () => {
        return (
            <ScrollDownFab show={displayFab} onClick={scrollDownImmediate} />
        );
    };

    return [ScrollButton, forceScrollDown];
};

export default useAutoScrollDown;
