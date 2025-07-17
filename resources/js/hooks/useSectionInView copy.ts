import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import InViewContext from '../contexts/InViewContext';

export default function useSectionInView(sectionName: string) {
    const { setInView } = useContext(InViewContext);
    const { ref: intersectionRef, inView: isInView } = useInView({
        rootMargin: '-45% 0px -45%',
    });

    useEffect(() => {
        if (isInView) {
            setInView((inView) => [...inView, sectionName]);
        } else {
            setInView((inView) => inView.filter((v) => v !== sectionName));
        }
    }, [isInView]);

    return intersectionRef;
}
