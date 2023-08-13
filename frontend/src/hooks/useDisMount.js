import { useEffect, useRef } from "react";

const useDisMount = (func, deps) => {
    const mount = useRef(false);

    useEffect(() => {
        if (mount.current) func();
        else mount.current = true;
    }, deps);
};

export default useDisMount;
