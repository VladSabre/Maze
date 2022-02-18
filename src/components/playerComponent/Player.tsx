import React from 'react';
import { ShakeDirection } from '../../types/shakeDIrection';
import './Player.scss';

namespace PlayerComponent {
    export interface State {
        shouldShake: ShakeDirection | null;
    }
}

export default class Player extends React.Component<{}, PlayerComponent.State> {
    constructor() {
        super({});
        this.state = {
            shouldShake: null
        };
    }

    public handleClosedWay(direction: ShakeDirection) {
        this.setState({
            shouldShake: direction
        });

        setTimeout(() => {
            this.setState({
                shouldShake: null
            });
        }, 500);
    }

    public render(): JSX.Element {
        const className = `player ${this.state.shouldShake === null
            ? ""
            : this.state.shouldShake === ShakeDirection.Horizontally
                ? "player__shaking-horizontally"
                : "player__shaking-vertically"
            }`;
        return <span className={className}></span>;
    }
}