import { FunctionComponent } from 'react';
import './Trail.scss';

namespace TrailComponent {
    export interface Props {
        shouldPulse: boolean;
    }
}

export const Trail: FunctionComponent<TrailComponent.Props> = ({ shouldPulse }) => {
    const className = `trail ${shouldPulse ? "trail__pulsing" : ""}`;
    return <span className={className}></span>;
}