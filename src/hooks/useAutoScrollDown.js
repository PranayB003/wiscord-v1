import { useCallback, useEffect, useRef } from "react";

const useAutoSrollDown = (containerRef, dependencies = []) => {
    const forceScroll = useRef(false);

    const container = containerRef.current;
    let scrolledToBottom;
    if (container) {
        scrolledToBottom =
            container.scrollHeight -
                container.clientHeight -
                container.scrollTop <=
            5;
        console.log(
            container.scrollHeight -
                container.clientHeight -
                container.scrollTop
        );
    }

    useEffect(() => {
        if (scrolledToBottom || forceScroll.current) {
            const children = container.children;
            const lastChildElement = children[children.length - 1];
            if (lastChildElement) {
                lastChildElement.scrollIntoView({
                    behaviour: "smooth",
                });
            }
        }
        forceScroll.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrolledToBottom, container, forceScroll, ...dependencies]);

    const forceScrollDown = useCallback(() => {
        forceScroll.current = true;
    }, [forceScroll]);

    return forceScrollDown;
};

export default useAutoSrollDown;
